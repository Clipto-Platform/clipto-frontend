import config from '@/config/config';
import { displayLensSignIn } from '@/redux/reducer';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Description } from '../styles/typography';

export const useSocialGraph = () => {
  const {library, account} = useWeb3React();
  const [awaitingForLogin, setAwaitingForLogin] = useState<boolean>(false);
  const hasLensAccess = useSelector((s: any) => s.hasLensAccess);
  
  const [lensAction, setLensAction] = useState<() => void>()

  const error = useSelector((s: any) => s.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasLensAccess && awaitingForLogin) {
      setAwaitingForLogin(false)
      if (lensAction) {
        lensAction()
      } else {
        throw 'lensAction is not set, make sure that doSocialGraphAction is being called before getting lensAccess'
      }
    }
    //creatorLensId and library should always be available, given that setAwaiting...Follow, only changes in the follow jsx block
  }, [hasLensAccess, awaitingForLogin])
  
  useEffect(() => {
    //reset pending actions
    if (error && awaitingForLogin) {
      setAwaitingForLogin(false)
    }
    return
  }, [error])

  const doSocialGraphAction = (actionName: string, onSuccessLens : () => void) => {
    setLensAction(() => onSuccessLens) // when you set a state to a function, it calls the function, when setting the state
    if (library.network.chainId != config.chainId) {
      toast.dismiss()
      toast.error(`Make sure that you are on ${config.chainName}`)
      return;
    }
    if (!hasLensAccess) { //note: there is a useEffect that listens for this confirmation to start the following process
      toast.dismiss()
      toast.error(`Please connect your lens account to ${actionName}`)
      setAwaitingForLogin(true)
      dispatch(displayLensSignIn(true))
      return;
    } 
    //if the user is already signed into lens, then follow/unfollow immediately
    onSuccessLens()
    }
  
  
  return {
    doSocialGraphAction
  };
};
