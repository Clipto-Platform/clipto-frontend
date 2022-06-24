import { combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getAllCreatorsUserName, getTwitterData } from '../api';
import * as lens from '@/api/lens'
import { Web3Provider } from '@ethersproject/providers';
import store from './store'
import config from '@/config/config';
import { toast } from 'react-toastify';
import { Address } from '@/utils/validation';

const toastError = (content : any) => {
  toast.dismiss()
  return toast.error(content)
}

interface Action {
  type: string;
  payload: {
    user: string;
  };
}


interface LensAccessAction {
  type: string;
  payload: any
}

export interface UserState {
  loading: boolean;
  user: string | null;
  hasLensAccess: boolean; //has lens access token
  error: any;
  lensProfile: any;
  displayLensSignIn: boolean;
}

const initialState = (() => {
  const user = localStorage.getItem('user')
  const accessToken = localStorage.getItem('token')
  return {
    loading: false,
    user: user,
    error: '',
    hasLensAccess: false,
    lensProfile: {},
    displayLensSignIn: false
  }
})()

const LOGIN = 'LOGIN'

const FETCH_LENS_ACCESS_CHECK = 'FETCH_LENS_ACCESS_CHECK'
const FETCH_LENS_ACCESS_REQUEST = 'FETCH_LENS_ACCESS_REQUEST'
const FETCH_LENS_ACCESS_SUCCESS = 'FETCH_LENS_ACCESS_SUCCESS'
const FETCH_LENS_ACCESS_FAILURE = 'FETCH_LENS_ACCESS_FAILURE'
const FETCH_LENS_ACCESS_REFRESHED = 'FETCH_LENS_ACCESS_REFRESHED'

const FETCH_LENS_LOGIN_REQUEST = 'FETCH_LENS_LOGIN_REQUEST';
const FETCH_LENS_LOGIN_SUCCESS = 'FETCH_LENS_LOGIN_SUCCESS';
const FETCH_LENS_LOGIN_FAILURE = 'FETCH_LENS_LOGIN_FAILURE';

const FETCH_LENS_PROFILE_REQUEST = 'FETCH_LENS_PROFILE_REQUEST';
const FETCH_LENS_PROFILE_SUCCESS = 'FETCH_LENS_PROFILE_SUCCESS';
const FETCH_LENS_PROFILE_FAILURE = 'FETCH_LENS_PROFILE_FAILURE';

const DISPLAY_LENS_SIGN_IN = 'DISPLAY_LENS_SIGN_IN';

const LOGOUT_LENS = 'LOGOUT_LENS'

// lens login modal action
export const displayLensSignIn = (show: boolean) => {
  return {
    type: DISPLAY_LENS_SIGN_IN,
    payload: {
      displayLensSignIn: show
    }
  }
}

export const logoutLens = () => {
  return {
    type: LOGOUT_LENS
  }
}
//login lens actions
const fetchLensLoginRequest = () => {
  return {
    type: FETCH_LENS_LOGIN_REQUEST,
  }
}

const fetchLensLoginSuccess = () => {
  return {
    type: FETCH_LENS_LOGIN_SUCCESS,
  }
}

const fetchLensLoginFailure = (error: any) => {
  return {
    type: FETCH_LENS_LOGIN_FAILURE,
    payload: {
      error: error
    }
  }
}


//profile lens action
const fetchLensProfileRequest = () => {
  return {
    type: FETCH_LENS_PROFILE_REQUEST,
  }
}

const fetchLensProfileSuccess = (lensProfile: any, displayLensSignInAfter: boolean) => {
  return {
    type: FETCH_LENS_PROFILE_SUCCESS,
    payload: {
      lensProfile: lensProfile,
      displayLensSignIn: displayLensSignInAfter
    }
  }
}

const fetchLensProfileFailure = (error : any) => {
  return {
    type: FETCH_LENS_PROFILE_FAILURE,
    payload: {
      error: error
    }
  }
}







//lens access actions
const fetchLensAccessCheck = () => {
  return {
    type: FETCH_LENS_ACCESS_CHECK
  }
}

const fetchLensAccessRequest = () => {
  return {
    type: FETCH_LENS_ACCESS_REQUEST
  }
}

const fetchLensAccessSuccess = (accessToken : string, refreshToken: string, userAddress : string, onSuccess: (accessToken: string) => void) => {
  onSuccess(accessToken)
  return {
    type: FETCH_LENS_ACCESS_SUCCESS,
    payload: {
      accessToken,
      refreshToken,
      user: userAddress
    }
  }
}

const fetchLensAccessRefreshed = (accessToken : string, refreshToken: string, userAddress : string) => {
  return {
    type: FETCH_LENS_ACCESS_REFRESHED,
    payload: {
      accessToken,
      refreshToken,
      user: userAddress
    }
  }
} 

const fetchLensAccessFailure = (error: string) => {
  return {
    type: FETCH_LENS_ACCESS_FAILURE,
    payload: error
  }
}

export const logout = () => {
  return { type: 'logout' }
}
export const login = (account : Address) => {
  const accessToken = localStorage.getItem('token')
  account && accessToken && lens.verifyJwt(account, accessToken) || false
  return { type: LOGIN, payload: { user: account } }
}

export const lensLogin = () => {
  return {type: 'lensLogin', payload: { hasLensAccess: true }}
}

export function reducer(state = { ...initialState }, action: LensAccessAction) {
  const { type, payload } = action;

  switch (type) {
    case DISPLAY_LENS_SIGN_IN: {
      return {
        ...state,
        displayLensSignIn: payload.displayLensSignIn,
        error: ''
      }
    }
    case LOGIN: {
      localStorage.setItem('user', payload.user);
      return {
        ...state,
        user: payload.user,
        lensProfile: {},
        hasLensAccess: payload.user == state.user // if previous user is the same as new user
      };
    }
    case FETCH_LENS_LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
        error: '',
        lensProfile: {}
      }
    }
    case FETCH_LENS_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        hasLensAccess: true,
        error: '',
        displayLensSignIn: false
      }
    }
    case FETCH_LENS_PROFILE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    }
    case FETCH_LENS_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        lensProfile: payload.lensProfile,
        //displayLensSignIn: payload.displayLensSignIn,
        error: ''
      }
    }
    case FETCH_LENS_PROFILE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: payload.error
      }
    }
    case FETCH_LENS_LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        hasLensAccess: false,
        error: payload.error
      }
    }
    case 'logout': {
      localStorage.removeItem('user'); //bad code!
      localStorage.removeItem('token'); //bad code!
      localStorage.removeItem('refreshToken') //bad code!
      return {
        ...state,
        user: null,
        hasLensAccess: false,
        error: ''
      };
    }
    case LOGOUT_LENS: {
      localStorage.removeItem('token'); //bad code!
      localStorage.removeItem('refreshToken') //bad code!
      return {
        ...state,
        hasLensAccess: false
      }
    }
    case FETCH_LENS_ACCESS_CHECK: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    }
    case FETCH_LENS_ACCESS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    }
    case FETCH_LENS_ACCESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        lensAccessToken: action.payload.accessToken,
        lensRefreshToken: action.payload.refreshToken,
        user: action.payload.user,
        error: ''
      }
    }
    case FETCH_LENS_ACCESS_FAILURE: {
      return {
        ...state,
        loading: false,
        lensAccessToken: '',
        error: action.payload
      }
    }
    default:
      return state;
  }
}

//TODO: when logout or switching addresses, accessToken needs to be cleared
//action thunk
export const fetchLensAccess = (address: string, library: Web3Provider, onSuccess: (accessToken: string) => void) => {
  const {lensAccessToken, lensRefreshToken} = store.getState();
  return (dispatch: any) => {
    dispatch(fetchLensAccessCheck())
    // first check if on right network
    if (library.network.chainId != config.chainId) {
      dispatch(fetchLensAccessFailure(`Make sure that you are on network ${config.chainName} (chain id: ${config.chainId})`))
      toastError(`Make sure you are on ${config.chainName}`)
      return;
    }
    if (
      lens.verifyJwt(address, lensAccessToken) &&
      lens.verifyJwt(address, lensRefreshToken)
    ) {
      dispatch(fetchLensAccessSuccess(lensAccessToken, lensRefreshToken, address, onSuccess));
      lens.refreshAccess(lensRefreshToken, library).then(({data, error}) => {
        if (data && data.refresh) {
          dispatch(fetchLensAccessRefreshed(data.refresh.accessToken, data.refresh.refreshToken, address)) // address will match the token due to verifyJwt
        } else if (error) {
          console.warn(error)
          console.warn('Unable to refresh token')
        }
      });
      return;
    }
    dispatch(fetchLensAccessRequest())
    lens.getAccess(address, library).then(res => {
      if (res && res.data.authenticate.accessToken && res.data.authenticate.refreshToken) {
        dispatch(fetchLensAccessSuccess(
          res.data.authenticate.accessToken, 
          res.data.authenticate.refreshToken, 
          address, 
          onSuccess
        ))
      } else {
        dispatch(fetchLensAccessFailure('Something is wrong in lens.getAccess'))
      }
    }).catch(err => {
      console.log(err)
      dispatch(fetchLensAccessFailure(err))
    })
  }
}

export const fetchLensLogin = (address: string, library: Web3Provider | any) => {
  return (dispatch: any) => {
    if (store.getState().hasLensAccess) {
      dispatch(fetchLensLoginSuccess())
      return;
    } 
    dispatch(fetchLensLoginRequest())
    lens.getAccess(address, library).then((err) => {
      dispatch(fetchLensLoginSuccess())
    }).catch(err => dispatch(fetchLensLoginFailure(err && err.message || err)))
  }
}

export const fetchLensProfile = (address: string, displayLensSignInAfter : boolean = false, cb? : () => void) => {
  return (dispatch: any) => {
    dispatch(fetchLensProfileRequest())
    lens.getProfile(address).then(({data, error}) => {
      console.log(data)
      if (error) {
        dispatch(fetchLensProfileFailure(error))
      } else if (data && data.profiles.items.length > 0) {
        //todo: get connected lens profile or default lens profile instead of the first one
        dispatch(fetchLensProfileSuccess(data.profiles.items[0], displayLensSignInAfter)) 
      } else {
        dispatch(fetchLensProfileFailure('You probably do not have a lens profile'))
      }
      cb && cb()
    })
      .catch(err => {
        dispatch(fetchLensProfileFailure(err))
        cb && cb()
      })
  }
}



export default reducer

// export const allReducer = combineReducers({
//   user: reducer,
//   lensAccess: reducerLens
//   // profilePicture: profilePictureReducer,
// });

//export default allReducer