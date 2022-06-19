import { Web3Provider } from '@ethersproject/providers';
import * as UpChunk from '@mux/upchunk';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, ContractReceipt } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import BounceLoader from 'react-spinners/BounceLoader';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import * as api from '../../api';
import * as lens from '../../api/lens';
import { postRequest } from '../../api/lens';
import { EntityRequest } from '../../api/types';
import { PrimaryButton } from '../../components/Button';
import { HeaderSpacer } from '../../components/Header/Header';
import { PageContentWrapper, PageWrapper } from '../../components/layout/Common';
import { NFTDetails } from '../../components/NFTDetails';
import { NFTHistory } from '../../components/NFTHistory';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import { SecondaryLabel } from '../../components/OrderCard/Style';
import { TextField } from '../../components/TextField';
import { Video } from '../../components/Video';
import { useExchangeContract, useExchangeContractV1 } from '../../hooks/useContracts';
import { uploadToIPFS } from '../../lib/uploadToIPFS';
import { Description, Label, Text } from '../../styles/typography';
import { getNFTDetails, getNFTHistory } from '../../web3/nft';
import { signMessage } from '../../web3/request';
import { LensPostButton } from './LensPostButton';
import {
  BookingCard,
  ComboButtonContainer,
  Divider,
  ImageCardContainer,
  ImageCardImg,
  UploadStatusContainer,
} from './Style';
import { ArweaveResponse, NFTDetailsType, NFTFormError, NFTHistories } from './types';
// import uploadToIPFS from '../../lib/uploadToIPFS'


const SelectedOrderPage = () => {
  const { account, library } = useWeb3React<Web3Provider>();
  const { creator, requestId, version } = useParams();
  const exchangeContractV1 = useExchangeContractV1(true);
  const exchangeContract = useExchangeContract(true);

  const theme = useTheme();
  const [uploadMetadata, setUploadMetadata] = useState<ArweaveResponse | undefined>(undefined);
  const [tokenUri, setTokenUri] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [done, setDone] = useState(false);
  const [request, setRequest] = useState<EntityRequest>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [minting, setMinting] = useState<boolean>(false);
  const [nftDetails, setNftDetails] = useState<NFTDetailsType>();
  const [clipDetails, setClipDetails] = useState('');
  const [nftName, setNftName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<NFTFormError>();
  const [history, setHistory] = useState<NFTHistories[]>();

  useEffect(() => {
    if (creator && requestId && version) {
      api
        .requestById(requestId, creator, version)
        .then((res) => {
          if (res.data) {
            const request = res.data.requests[0];
            setRequest(request);

            if (request.delivered && exchangeContract) {
              fetchNFTDetails(request);
            }
          }
        })
        .finally(() => setLoaded(true));
    }
  }, [exchangeContract]);

  const validate = (name: string, desc: string) => {
    if (name.length === 0 && desc.length === 0) {
      return { name: 'This field cannot be empty', description: 'This field cannot be empty' };
    } else if (name.length === 0) return { name: 'This field cannot be empty' };
    else if (desc.length === 0) return { description: 'This field cannot be empty' };
    return;
  };

  const onDrop = useCallback(
    async <T extends File>(acceptedFiles: T[]) => {
      const error = validate(nftName, description);
      if (error) {
        toast.error('Please add title and description');
        setError(error);
        return;
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
          extension: acceptedFiles[0].name.split('.').pop() || '',
        });
        const uploadUuid = uploadReq.data.job_uuid;
        const resumableUrl = await api.extractResumeableUrl(uploadReq.data.upload_url);
        const fileUpload = UpChunk.createUpload({
          endpoint: resumableUrl!,
          file: acceptedFiles[0],
          chunkSize: 5120, // Uploads the file in ~5mb chunks
          maxFileSize: 51200, // max file size ~50mb
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
                  name: nftName,
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
      } catch (err: any) {
        toast.error(`Error uploading file. File size should be less than 50mb`);
        return;
      }
    },
    [nftName, description],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'video/*,.mkv,.flv' });

  const waitForIndexing = async (txHash: string) => {
    // toast.loading('Indexing your request, will be done soon');
    await api.indexRequest(txHash);
    // toast.dismiss();
  };

  const extractEvent = async (receipt: ContractReceipt, request: EntityRequest) => {
    const events = receipt.events;
    const filtered = events?.find((event) => event.event === 'DeliveredRequest');

    if (filtered && filtered.args) {
      let nftTokenAddress = request.creator.nftTokenAddress;
      let nftTokenId =
        request.version === 'v0' ? filtered.args.tokenId.toNumber() : filtered.args.nftTokenId.toNumber();

      fetchNFT(nftTokenAddress, nftTokenId, tokenUri);
      setDone(true);
    }
  };

  const completeBooking = async () => {
    if (!request) {
      toast.error('Request not found. Try reloading the page...');
      return;
    }

    try {
      setMinting(true);
      const version = request.id.split('-')[1];
      const contract = version === 'v0' ? exchangeContract : exchangeContractV1;
      const transaction = await contract.deliverRequest(request.requestId, 'https://arweave.net/' + tokenUri);
      const receipt = await transaction.wait();

      await extractEvent(receipt, request);
      await waitForIndexing(transaction.hash);

      toast.success('Successfully completed order! Order status will be reflected shortly.');
    } catch (e) {
      setMinting(false);
      toast.error('Failed to mint NFT!');
    }
  };

  const getNFTVideo = async (id: string) => {
    const metadata = await api.getArweaveMetadata(id);
    setClipDetails(metadata.data.animation_url);
  };

  const fetchNFT = async (tokenAddress: string, tokenId: number, tokenUri: string) => {
    const details = getNFTDetails(tokenAddress, tokenId, tokenUri);
    setNftDetails(details);
    getNFTVideo(details.arweave);

    getNFTHistory(tokenAddress, tokenId).then((histories) => {
      setHistory(histories);
    });
  };

  const fetchNFTDetails = async (request: EntityRequest) => {
    const details = getNFTDetails(request.nftTokenAddress, request.nftTokenId, request.nftTokenUri);
    setNftDetails(details);
    getNFTVideo(details.arweave);

    getNFTHistory(request.nftTokenAddress, request.nftTokenId).then((histories) => {
      setHistory(histories);
    });
  };

  return (
    <>
      {loaded && (
        <PageWrapper>
          <HeaderSpacer />
          <PageContentWrapper style={{ display: 'block', maxWidth: '600px', margin: 'auto' }}>
            {!((request && request.delivered) || done) && (
              <>
                <Divider>
                  <TextField
                    type="text"
                    label={'Title for the NFT'}
                    placeholder={`Give an awesome title`}
                    value={nftName}
                    onChange={setNftName}
                    maxLength={50}
                    errorMessage={error?.name}
                  />
                </Divider>

                <Divider>
                  <TextField
                    inputElementType="textarea"
                    label={'Description for the NFT'}
                    placeholder="Some good description"
                    value={description}
                    maxLength={1000}
                    onChange={setDescription}
                    errorMessage={error?.description}
                  />
                </Divider>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <BookingCard style={{ textAlign: 'center', display: 'flex', marginBottom: 24 }}>
                    {!uploadMetadata && (
                      <div style={{ margin: 'auto' }}>
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
                              <Description>
                                Drag and drop a video or click to select a file to upload
                                <br />
                                (max video size 50mb)
                                <br />
                                *Video length should not be less than 6 seconds
                              </Description>
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
                  {uploadStatus && (
                    <Description style={{ fontSize: 16, paddingBottom: '10px' }}>
                      * this may take a few minutes
                    </Description>
                  )}
                </div>
              </>
            )}

            {uploadMetadata && !done && tokenUri && (
              <ComboButtonContainer>
                <PrimaryButton onPress={completeBooking} size="small" style={{ marginRight: 20 }} isDisabled={minting}>
                  Mint and send NFT
                </PrimaryButton>
                <PrimaryButton
                  size="small"
                  variant="secondary"
                  isDisabled={minting}
                  onPress={() => setUploadMetadata(undefined)}
                >
                  New upload
                </PrimaryButton>
              </ComboButtonContainer>
            )}

            {(request?.delivered || clipDetails) && <Video src={clipDetails} />}

            {request && (
              <OrderCard
                request={request!}
                key={request.id}
                displayBusiness={true}
                isReceived={false}
                isBusiness={false}
              />
            )}
            {!request && <Label>Could not find request</Label>}
            {true && <LensPostButton onPress={async () => {
              try {
                console.log(account)
                if (!account) return;
                toast.loading('Signing into Lens');
                const accessToken = await lens.getAccess(account, library as Web3Provider);
                toast.dismiss();
                if (!accessToken) return;
                const content = {
                  "version": "1.0.0",
                  "metadata_id": "6936408776530249488",
                  "description": "adsf",
                  "content": "adsf",
                  "external_url": "https://lenster.xyz/u/jonomnom.lens",
                  "image": null,
                  "imageMimeType": null,
                  "name": "Post by @jonomnom.lens",
                  "mainContentFocus": "TEXT",
                  "contentWarning": null,
                  "attributes": [
                    {
                      "traitType": "string",
                      "key": "type",
                      "value": "post"
                    }
                  ],
                  "media": [
                    
                  ],
                  "createdOn": "2022-06-17T00:02:28.704Z",
                  "appId": "Clipto"
                }
                // const ipfs = ipfsClient({
                //   host: 'ipfs.infura.io',
                //   port: 5001,
                //   protocol: 'https'
                // })
                // um..... Why does cdn work but npm package doesn't :o)
                // awaiting solution - apparently this is a common issue with vite and 

                uploadToIPFS(content)
                // const addResult = await uploadToIPFS(content)
                // console.log(addResult)
                return;
                const request = {
                  profileId: "0x1052",
                  contentURI: "https://ipfs.infura.io/ipfs/QmTsJdsQcvP6xveEm1bqEUtn8sYZpPUA6y5vZawzysPKkA",
                  collectModule: {
                    freeCollectModule: {
                      followerOnly: false
                    }
                  },
                  referenceModule: {
                    "followerOnlyReferenceModule": false
                  }
                }
                lens.postRequest(request, accessToken.data.authenticate.accessToken, library as Web3Provider)
              } catch (e) {
                console.error(e)
                toast.error('Something is wrong')
              }
            }}/>}
            {nftDetails && <NFTDetails details={nftDetails} />}
            {history && <NFTHistory history={history} />}
          </PageContentWrapper>
        </PageWrapper>
      )}
    </>
  );
};

export { SelectedOrderPage };
