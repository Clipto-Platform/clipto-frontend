import { Web3Provider } from '@ethersproject/providers';
import * as UpChunk from '@mux/upchunk';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import BounceLoader from 'react-spinners/BounceLoader';
import { toast } from 'react-toastify';
import styled, { useTheme } from 'styled-components';
import * as api from '../api';
import { PrimaryButton } from '../components/Button';
import { Card } from '../components/Card';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { PageContentWrapper, PageWrapper, Row } from '../components/layout/Common';
import { Link } from '../components/Link';
import { OrderCard } from '../components/OrderCard';
import { CHAIN_NAMES, DEFAULT_CHAIN_ID, ENV, getContractLink, getEtherscan, getOpensea } from '../config/config';
import { CliptoToken__factory } from '../contracts';
import { getProviderOrSigner, useExchangeContract } from '../hooks/useContracts';
import { Description, Label } from '../styles/typography';
import { getShortenedAddress } from '../utils/address';
import { signMessage } from '../web3/request';
import { Request } from './Orders';

const BookingCard = styled.div`
  background: ${(props) => props.theme.lessDarkGray};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 16px;
  padding: 32px 24px;
  height: 512px;
  border: 2.5px dashed #2a2a2a;
  box-sizing: border-box;
  border-radius: 16px;
`;

const ImageCardContainer = styled.div`
  object-fit: fill;
  border-radius: 16px;
  :not(:last-child) {
    margin-right: 24px;
  }
`;

const ImageCardImg = styled.img`
  object-fit: fill;
  user-select: none;
  max-height: 450px;
`;

const VideoCard = styled.video`
  border-radius: 15px;
`;

const UploadStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Value = styled.div`
  flex-grow: 2;
  text-align: end;
  color: gray;
`;

const RowContainer = styled.div`
 display: flex;
 flex-grow: 2;
 flex-direction: column;
`;

const Key = styled(Label)`
  margin-bottom: 15px;
  font-weight: 500;
`;

export interface ArweaveResponse {
  name: string;
  description: string;
  image: string;
  animation_url: string;
}

export interface NFTDetails {
  contractAddress: string;
  contractLink: string;
  etherscan: string;
  opensea: string;
  metadata: string;
  tokenId: number;
  chain: string;
}

const SelectedOrderPage = (props: any) => {
  const theme = useTheme();

  const [uploadMetadata, setUploadMetadata] = useState<ArweaveResponse | undefined>(undefined);
  const [tokenUri, setTokenUri] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [done, setDone] = useState(false);
  const { account, library } = useWeb3React<Web3Provider>();
  const exchangeContract = useExchangeContract(true);
  const { creator, requestId } = useParams();
  const [request, setRequest] = useState<Request>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [minting, setMinting] = useState<boolean>(false);
  const [nftDetails, setNftDetails] = useState<NFTDetails>();
  const [clipDetails, setClipDetails] = useState('');

  const onDrop = useCallback(async <T extends File>(acceptedFiles: T[]) => {
    try {
      const messageToSign = 'I am uploading a video to complete the Order';
      const signed = await signMessage(library, account, messageToSign);
      const uploadReq = await api.getUploadFileLink({
        signed,
        address: account || '',
        message: messageToSign,
        extension: acceptedFiles[0].name.split('.').pop() || ''
      });
      const uploadUuid = uploadReq.data.job_uuid;
      const resumableUrl = await api.extractResumeableUrl(uploadReq.data.upload_url);
      const fileUpload = UpChunk.createUpload({
        endpoint: resumableUrl!,
        file: acceptedFiles[0],
        chunkSize: 5120, // Uploads the file in ~5mb chunks
      });

      setUploadStatus('Uploading...');
      fileUpload.on('error', (err) => {
        toast.error(`Error uploading: ${err.detail}`);
      });

      fileUpload.on('progress', (progress) => {
        console.log(`So far we've uploaded ${progress.detail}% of this file.`);
      });

      fileUpload.on('success', () => {
        setUploadStatus('Transcoding...');
        const checkUploadInterval = setInterval(async () => {
          try {
            const checkUploadStatus = await api.getUploadFileStatus(uploadUuid);
            if (
              checkUploadStatus.data.transcoding_complete === 'succeeded' &&
              checkUploadStatus.data.image_complete === true &&
              checkUploadStatus.data.video_complete === true
            ) {
              clearInterval(checkUploadInterval);

              const finalizeResult = await api.finalizeFileUpload({
                uploadUuid: uploadUuid,
                description: 'this is desc',
                name: 'this is name'
              });

              const arweaveUrl = finalizeResult.data.arweave_metadata;
              const arweaveMetadata = await api.getArweaveMetadata(arweaveUrl);
              setTokenUri(arweaveUrl);
              setUploadMetadata(arweaveMetadata.data);
              setUploadStatus('');
            }
          } catch (err) {
            toast.error(`Error generating permalink`);
            clearInterval(checkUploadInterval);
          }
        }, 5000);
      });
    } catch (err) {
      toast.error(`Error uploading file`);
      return;
    }
  }, []);

  const completeBooking = async () => {
    if (!request) {
      toast.error('Request not found. Try reloading the page...');
      return;
    }

    try {
      setMinting(true);
      // TODO: may need to use ar:// 
      const tx = await exchangeContract.deliverRequest(request.id, 'https://arweave.net/' + tokenUri);
      const receipt = await tx.wait();
      const eventArgs = receipt.events?.find((i) => i.event === 'DeliveredRequest')?.args;
      const tokenAddress = eventArgs?.tokenAddress;
      const tokenId = eventArgs?.tokenId.toNumber();
      fetchNFT(tokenAddress, tokenId);

      await api.completeBooking({
        id: request.id,
        txHash: tx.hash,
        creatorAddress: account,
      });
      toast.success('Successfully completed order!');
      setDone(true);
    } catch (e) {
      setMinting(false)
      toast.error('Failed to mint NFT!');
    }
  }

  const getNftToken = (nftAddress: string) => {
    const provider = getProviderOrSigner(library, account);
    return CliptoToken__factory.connect(nftAddress, provider);
  }

  const fetchNFT = async (tokenAddress: string, tokenIndex: number) => {
    try {

      const token = getNftToken(tokenAddress);
      const metadata = await token.tokenURI(tokenIndex);
      setNftDetails({
        chain: CHAIN_NAMES[DEFAULT_CHAIN_ID],
        contractAddress: getShortenedAddress(tokenAddress),
        tokenId: tokenIndex,
        etherscan: getEtherscan(tokenAddress),
        opensea: getOpensea(tokenAddress, tokenIndex),
        contractLink: getContractLink(tokenAddress),
        metadata: `https://arweave.net/${metadata.split('/').pop()}`,
      });

      const response = await api.getArweaveMetadata(metadata.split('/').pop() || '');
      setClipDetails(response.data.animation_url);

    } catch (err) {
      toast.error('Error fetching NFT details');
    }
  }

  const fetchNFTDetails = async () => {
    const tokenAddress = await exchangeContract.creators(account || '');
    fetchNFT(tokenAddress, 0);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (creator && requestId) {
      api.getRequestById(creator, requestId)
        .then((res) => {
          setRequest(res.data);

          if (res.data.delivered && exchangeContract) {
            fetchNFTDetails();
          }
        })
        .finally(() => setLoaded(true));
    }
  }, [exchangeContract]);

  return (
    <>
      {loaded && (
        <PageWrapper>
          <HeaderSpacer />
          <HeaderContentGapSpacer />
          <PageContentWrapper style={{ display: 'block', maxWidth: '600px', margin: 'auto' }}>
            {!((request && request.delivered) || done) && (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <BookingCard style={{ textAlign: 'center', display: 'flex', marginBottom: 24 }}>
                  {!uploadMetadata && (
                    <div style={{ margin: 'auto' }}>
                      {/** TODO(jonathanng) - Text size is off */}
                      {uploadStatus ? (
                        <UploadStatusContainer>
                          <BounceLoader
                            color={theme.yellow}
                            loading={true}
                            size={50}
                            css={`
                                display: block;
                                margin: auto;
                              `}
                          />
                          <Label>{uploadStatus}</Label>
                        </UploadStatusContainer>
                      ) : (
                        <>
                          <Label style={{ marginBottom: '8px' }}>Upload clip</Label>
                          {isDragActive ? (
                            <p>Drop the files here ...</p>
                          ) : (
                            <Description>Drag and drop an mp4 or click to select a file to upload</Description>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {uploadMetadata && (
                    <ImageCardContainer style={{ margin: 'auto' }}>
                      <ImageCardImg src={uploadMetadata.image} />
                    </ImageCardContainer>
                  )}
                </BookingCard>
              </div>
            )}

            {uploadMetadata && !done && tokenUri && (
              <div style={{ display: 'flex', marginBottom: 20 }}>
                <PrimaryButton
                  onPress={completeBooking}
                  size="small"
                  style={{ marginRight: 20 }}
                  isDisabled={minting}
                >
                  Mint and send NFT
                </PrimaryButton>
                <PrimaryButton size="small" variant="secondary" onPress={() => setUploadMetadata(undefined)}>
                  New upload
                </PrimaryButton>
              </div>
            )}

            {clipDetails &&
              <ImageCardContainer style={{ margin: 'auto' }}>
                <VideoCard src={clipDetails} width={600} controls autoPlay muted />
              </ImageCardContainer>
            }

            {request && <OrderCard request={request!} key={1} isReceived={false} />}
            {!request && <Label>Could not find request</Label>}

            {nftDetails && (
              <>
                <Card title="NFT Details">
                  <RowContainer>
                    <Row>
                      <Key>Contract Address</Key>
                      <Value>
                        <Link url={nftDetails.contractLink}>{nftDetails.contractAddress}</Link>
                      </Value>
                    </Row>
                    <Row>
                      <Key>Token ID</Key>
                      <Value>10</Value>
                    </Row>
                    <Row>
                      <Key>Chain</Key>
                      <Value>{nftDetails.chain}</Value>
                    </Row>
                    <Row>
                      <Key>Metadata</Key>
                      <Value><Link url={nftDetails.metadata} /></Value>
                    </Row>
                    <Row>
                      <Key>View on Etherscan</Key>
                      <Value><Link url={nftDetails.etherscan} /></Value>
                    </Row>
                    <Row>
                      <Key>View on Opensea</Key>
                      <Value><Link url={nftDetails.opensea} /></Value>
                    </Row>
                  </RowContainer>
                </Card>
              </>
            )}
          </PageContentWrapper>
        </PageWrapper>
      )}
    </>
  );
};

export { SelectedOrderPage };
