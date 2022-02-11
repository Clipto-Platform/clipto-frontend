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
import { TextField } from '../components/TextField';
import { useExchangeContract } from '../hooks/useContracts';
import { Description, Label } from '../styles/typography';
import { getShortenedAddress } from '../utils/address';
import { getNFTDetails, getNFTHistory, getTokenIdAndAddress } from '../web3/nft';
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

const Divider = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
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

export interface NFTFormError {
  name?: string;
  description?: string;
}

export interface NFTHistory {
  from: string;
  to: string;
  timestamp: string;
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
  const [nftName, setNftName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<NFTFormError>();
  const [history, setHistory] = useState<NFTHistory[]>();

  const validate = (name: string, desc: string) => {
    if (name.length === 0) return { name: 'This field cannot be empty' };
    else if (desc.length === 0) return { description: 'This field cannot be empty' };
    return;
  }

  const onDrop = useCallback(async <T extends File>(acceptedFiles: T[]) => {
    const error = validate(nftName, description)
    if (error) {
      setError(error); return;
    } else {
      setError({});
    }

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

      fileUpload.on('progress', (prog) => {
        const progress = parseInt(prog.detail).toFixed(0);
        setUploadStatus(`Uploading ${progress}%...`);
      });

      fileUpload.on('success', () => {
        const checkUploadInterval = setInterval(async () => {
          try {
            const checkUploadStatus = await api.getUploadFileStatus(uploadUuid);
            setUploadStatus('Transcoding...');

            if (
              checkUploadStatus.data.transcoding_complete === 'succeeded' &&
              checkUploadStatus.data.image_complete === true &&
              checkUploadStatus.data.video_complete === true
            ) {
              clearInterval(checkUploadInterval);
              setUploadStatus('Transcoding Complete...');

              const finalizeResult = await api.finalizeFileUpload({
                uploadUuid: uploadUuid,
                description: description,
                name: nftName
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
  }, [nftName, description]);

  const completeBooking = async () => {
    if (!request) {
      toast.error('Request not found. Try reloading the page...');
      return;
    }

    try {
      setMinting(true);
      const messageToSign = 'I am completing an order';
      const signed = await signMessage(library, account, messageToSign);
      const tx = await exchangeContract.deliverRequest(request.requestId, 'https://arweave.net/' + tokenUri);
      const receipt = await tx.wait();
      const eventArgs = receipt.events?.find((i) => i.event === 'DeliveredRequest')?.args;
      const tokenAddress = eventArgs?.tokenAddress;
      const tokenId = eventArgs?.tokenId.toNumber();
      fetchNFT(tokenAddress, tokenId);

      await api.completeBooking({
        id: request.id,
        address: account || '',
        message: messageToSign,
        signed: signed,
      });
      toast.success('Successfully completed order!');
      setDone(true);
    } catch (e) {
      setMinting(false)
      toast.error('Failed to mint NFT!');
    }
  }

  const getNFTVideo = async (id: string) => {
    const metadata = await api.getArweaveMetadata(id);
    setClipDetails(metadata.data.animation_url);
  }

  const fetchNFT = async (tokenAddress: string, tokenId: number) => {
    getNFTDetails(tokenAddress, tokenId).then((details) => {
      if (details) {
        setNftDetails(details);
        getNFTVideo(details.arweave);
      }
    });

    getNFTHistory(tokenAddress, tokenId).then((histories) => {
      setHistory(histories);
    });
  }

  const fetchNFTDetails = async (request: Request) => {
    toast.success('Fetching NFT details');
    const { tokenId, tokenAddress } = await getTokenIdAndAddress(request);
    fetchNFT(tokenAddress, tokenId);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (creator && requestId) {
      api.getRequestById(creator, requestId)
        .then((res) => {
          setRequest(res.data);

          if (res.data.delivered && exchangeContract) {
            fetchNFTDetails(res.data);
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
              <>
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

                <Divider>
                  <TextField
                    type='text'
                    label={'Title for the NFT'}
                    placeholder={`Give an awesome title`}
                    value={nftName}
                    onChange={setNftName}
                    errorMessage={error?.name}
                  />
                </Divider>

                <Divider>
                  <TextField
                    inputElementType='textarea'
                    label={'Description for the NFT'}
                    placeholder="Some good description"
                    value={description}
                    onChange={setDescription}
                    errorMessage={error?.description}
                  />
                </Divider>
              </>
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
                <VideoCard src={clipDetails} width={600} controls autoPlay />
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
                      <Value>{nftDetails.tokenId}</Value>
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
                      <Key>View on Polygonscan</Key>
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

            {history && (
              <>
                <Card title="History">
                  <RowContainer>
                    {history.map((record, id) => {
                      return (
                        <Row key={id}>
                          <Key>
                            <Label>
                              {
                                parseInt(record.from) === 0
                                  ? `Minted NFT to ${getShortenedAddress(record.to)}`
                                  : `${getShortenedAddress(record.from)} transfered to ${getShortenedAddress(record.to)}`
                              }
                            </Label>
                          </Key>
                          <Value>{record.timestamp}</Value>
                        </Row>
                      )
                    })}
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
