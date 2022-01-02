import { Web3Provider } from '@ethersproject/providers';
import * as UpChunk from '@mux/upchunk';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import BounceLoader from 'react-spinners/BounceLoader';
import { toast } from 'react-toastify';
import styled, { useTheme } from 'styled-components';

import pfp from '../assets/images/pfps/sample-profile.png';
import { PrimaryButton } from '../components/Button';
import { Card } from '../components/Card';
import { HeaderContentGapSpacer, HeaderSpacer } from '../components/Header';
import { PageContentWrapper, PageWrapper } from '../components/layout/Common';
import { OrderCard } from '../components/OrderCard';
import { API_URL } from '../config/config';
import { useExchangeContract } from '../hooks/useContracts';
import { Description, Label } from '../styles/typography';
import { extractResumeableUrl } from '../utils/http';
import { CreateRequestDto } from './Booking';

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
`;

const UploadStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectedOrderPage = (props: any) => {
  const theme = useTheme();

  const [upload, setUpload] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [done, setDone] = useState(false);
  const { account } = useWeb3React<Web3Provider>();
  const exchangeContract = useExchangeContract(true);
  const { creator, requestId } = useParams();
  const [request, setRequest] = useState<CreateRequestDto>();
  const [loaded, setLoaded] = useState<boolean>(false);

  const onDrop = useCallback(async <T extends File>(acceptedFiles: T[]) => {
    const uploadReq = await axios.post(`${API_URL}/upload`, { extension: acceptedFiles[0].name.split('.').pop() });

    const requestUuid = uploadReq.data.job_uuid;
    const resumableUrl = await extractResumeableUrl(uploadReq.data.upload_url);
    setUploadStatus('Uploading...');
    const upload = UpChunk.createUpload({
      endpoint: resumableUrl!,
      file: acceptedFiles[0],
      chunkSize: 5120, // Uploads the file in ~5mb chunks
    });

    upload.on('error', (err) => {
      toast.error(`Error uploading: ${err.detail}`);
    });

    upload.on('progress', (progress) => {
      console.log(`So far we've uploaded ${progress.detail}% of this file.`);
    });

    upload.on('success', () => {
      setUploadStatus('Transcoding...');
      const checkUploadInterval = setInterval(async () => {
        const checkUploadStatus = await axios.get(
          `https://testing.glassapi.xyz/organizations/clipto/videos/${requestUuid}/status`,
        );
        console.log(checkUploadStatus.data);
        if (
          checkUploadStatus.data.transcoding_complete === 'succeeded' &&
          checkUploadStatus.data.image_complete === true &&
          checkUploadStatus.data.video_complete === true
        ) {
          clearInterval(checkUploadInterval);
          const finalizeResult = await axios.post(
            `https://testing.glassapi.xyz/organizations/clipto/videos/${requestUuid}/finalize`,
            {
              description: 'test',
              name: 'test',
            },
          );
          console.log(finalizeResult);
          setUploadStatus('');
        }
      }, 5000);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    // const creator = location?.state!.request.creator;
    // const requestId = location.state.request.requestId;
    exchangeContract.requests(creator!, requestId!).then((e) => {
      axios
        .get(`${API_URL}/request/creator/${creator}/${requestId}`)
        .then((res) => {
          setRequest(res.data);
        })
        .catch(console.error)
        .finally(() => {
          setLoaded(true);
        });
    });
  }, []);

  return (
    <>
      {loaded && (
        <>
          {((request && request.delivered) || done) && (
            <PageWrapper>
              <HeaderSpacer />
              <HeaderContentGapSpacer />
              <PageContentWrapper style={{ display: 'block', maxWidth: '600px', margin: 'auto' }}>
                <Label>Request is delivered or refunded</Label>
              </PageContentWrapper>
            </PageWrapper>
          )}
          {!((request && request.delivered) || done) && (
            <PageWrapper>
              <HeaderSpacer />
              <HeaderContentGapSpacer />
              <PageContentWrapper style={{ display: 'block', maxWidth: '600px', margin: 'auto' }}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <BookingCard style={{ textAlign: 'center', display: 'flex', marginBottom: 24 }}>
                    {!upload && (
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

                    {upload && (
                      <ImageCardContainer style={{ margin: 'auto' }}>
                        <ImageCardImg src={pfp} />
                      </ImageCardContainer>
                    )}
                  </BookingCard>
                </div>

                {upload && !done && (
                  <div style={{ display: 'flex', marginBottom: 20 }}>
                    <PrimaryButton
                      onPress={async () => {
                        // const id = location.state.request.id;
                        // console.log(account);
                        //TODO(jonathanng) - get actual request
                        if (!request) {
                          toast.error('Request not found. Try reloading the page...');
                          return;
                        }
                        const tx = await exchangeContract.deliverRequest(parseInt(requestId!), pfp);
                        const receipt = await tx.wait();
                        const verificationResult = await axios
                          .post(`${API_URL}/request/finish`, { id: request.id })
                          .then(() => {
                            toast.success('Successfully completed order!');
                            setDone(true);
                          })
                          .catch((e) => {
                            console.log(e);
                            toast.error('Failed to mint NFT!');
                          });
                      }}
                      size="small"
                      style={{ marginRight: 20 }}
                    >
                      Mint and send NFT
                    </PrimaryButton>
                    <PrimaryButton size="small" variant="secondary" onPress={() => setUpload('')}>
                      New upload
                    </PrimaryButton>
                  </div>
                )}
                {request && <OrderCard request={request!} key={1} />}
                {!request && <Label>Could not find request</Label>}

                {done && (
                  <>
                    <Card title="History"></Card>
                    <Card title="NFT Details"></Card>
                  </>
                )}
              </PageContentWrapper>
            </PageWrapper>
          )}
        </>
      )}
    </>
  );
};

export { SelectedOrderPage };
