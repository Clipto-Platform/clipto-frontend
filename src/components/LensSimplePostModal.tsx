import * as lens from '@/api/lens';
import config from "@/config/config";
import { uploadToIPFS } from "@/lib/uploadToIPFS";
import { endLensPost, LensPostData } from "@/redux/reducer";
import { Web3Provider } from "@ethersproject/providers";
import { OverlayContainer } from '@react-aria/overlays';
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { PrimaryButton } from "./Button";
import { ModalDialog } from "./Dialog";
import { ConnectWalletPopup, Error } from "./Header/Style";
import { TextField } from "./TextField";

export const Title = styled.div`
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 18;
  text-align: 'left';
`;

export const Subtitle = styled.div`
  margin-bottom: 12px;
  font-size: 18;
  text-align: 'left';
`;

const lensSimplePostModal = () => {
  const showLensPostModal = useSelector((s: any) => s.showLensPostModal); //todo - remember to remove true
  const { account, library } = useWeb3React<Web3Provider>();
  const loading = useSelector((state: any) => state.loading);
  const error = useSelector((state : any) => state.error);
  const dispatch = useDispatch();
  const lensPostData = useSelector((s : any) => s.lensPostData)
  const [loadingPost, setLoadingPost ] = useState(false);
  const [contentInState, setContent] = useState<string>('');
  const shareToLens = async (clipDetailsFull : LensPostData) => {
    try {
      console.log(account)
      if (!account) return;
      
      const lensProfileRes = await lens.getProfile(account)
      console.log(lensProfileRes) 
      if (lensProfileRes.data && lensProfileRes.data.profiles.items.length == 0) {
        toast.dismiss()
        toast.error('A lens profile NFT is required in order to post.')
        return;
      }
      toast.dismiss()
      toast.loading('Creating post');
      const lensHandle = lensProfileRes.data.profiles.items[0].handle
      const lensId = lensProfileRes.data.profiles.items[0].id
      //example metadata:
      // text + video
      //https://bafybeidswqwkngytwe6g52glyfaui5rqqbd22k6eeqcokfrxgmc4u2cptm.ipfs.infura-ipfs.io/
      // video only
      //https://bafybeifr3bhfnfqipawsmifyb67dyvjuj7ga7igm2acjox2r22z2avacpi.ipfs.infura-ipfs.io/
      const content = {
        "version": "1.0.0",
        "metadata_id": `${uuidv4()}`,
        "description": `${clipDetailsFull.description} \n Created from ${config.url}`,
        "content": `${contentInState || `Created from ${config.url}`}`,
        "external_url": `${config.url}/creator/${clipDetailsFull.creatorAddress}`,
        "image": clipDetailsFull.image,
        "imageMimeType": null,
        "name": `Post by @${lensHandle}`,
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
          {
            "item": clipDetailsFull.animation_url,
            "type": "video/mp4",
            "altTag": ""
          }
        ],
        "createdOn": new Date().toISOString(),
        "appId": "Clipto"
      }
      console.log('Content to post:', content)
      const {path} = await uploadToIPFS(content)
      if (!path) {
        toast.dismiss()
        toast.error("Error uploading post to lens")
        return;
      }
      const request = {
        profileId: lensId, 
        contentURI: `https://ipfs.infura.io/ipfs/${path}`,
        collectModule: {
          freeCollectModule: {
            followerOnly: false
          }
        },
        referenceModule: {
          "followerOnlyReferenceModule": false
        }
      }
      console.log(request)
      const txHash = await lens.postRequest(request, library as Web3Provider)
      if (!txHash) {
        console.error('no txHash detected!');
        toast.dismiss();
        toast.error('Error in tx, please open console to screenshot and report error')
        return;
      }
      toast.dismiss();
      toast.loading('Waiting for transaction to complete');
      const f = await lens.pollUntilIndexed(txHash);
      toast.dismiss();
      toast.success('Transaction is finished, go on lenster to see your post.');
      dispatch(endLensPost())
    } catch (e) {
      console.error(e)
      toast.error('Something is wrong')
    }
  }
  
  return (<>
    {showLensPostModal && account && (
      <OverlayContainer>
          <ModalDialog
            containerStyles={{
              border: '1px solid #b3b3b3',
              padding: '24px',
              
            }}
            isOpen
            onClose={() => dispatch(endLensPost())}
            isDismissable
          >
            <>
              <Title>Create a post</Title>
              <Subtitle>Enter a description that will be posted with your clipto.</Subtitle>
              {error && <Error style= {{maxWidth: 310}}>{error}</Error>}
              <TextField
                inputElementType="textarea"
                maxLength={1000}
                placeholder={`Look at this clipto that I got from this creator!`}
                onChange={setContent}
                errorMessage={""}
              />
              <PrimaryButton
                variant={'secondary'}
                style={{ marginBottom: 16, minWidth: 310, marginTop: 16 }}
                isDisabled={loading || loadingPost}
                onPress={async () => {
                  if (!lensPostData) {
                    toast.dismiss()
                    toast.error('Unknown error')
                    return;
                  }
                  setLoadingPost(true)
                  await shareToLens(lensPostData)
                  setLoadingPost(false)
                }}
              >
                <ConnectWalletPopup>
                  {'Share to Lens  🌿'}
                </ConnectWalletPopup>
              </PrimaryButton>
            </>
          </ModalDialog>
        </OverlayContainer>
      )}
  </>)
}

export default lensSimplePostModal

