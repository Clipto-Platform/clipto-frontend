import { combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getAllCreatorsUserName, getTwitterData } from '../api';
import * as lens from '@/api/lens'
import { Web3Provider } from '@ethersproject/providers';

interface Action {
  type: string;
  payload: {
    user: string;
  };
}
// interface pfAction {
//   type: string;
//   payload: {
//     profilePicture: object[];
//   };
// }

interface LensAccessAction {
  type: string;
  payload: any
}

export interface UserState {
  loading: boolean;
  user: string | null;
  lensAccessToken: string | null;
  error: string;
}

const initialState = {
  loading: false,
  user: localStorage.getItem('user'),
  lensAccessToken: '',
  error: ''
};

const FETCH_LENS_ACCESS_CHECK = 'FETCH_LENS_ACCESS_CHECK'
const FETCH_LENS_ACCESS_REQUEST = 'FETCH_LENS_ACCESS_REQUEST'
const FETCH_LENS_ACCESS_SUCCESS = 'FETCH_LENS_ACCESS_SUCCESS'
const FETCH_LENS_ACCESS_FAILURE = 'FETCH_LENS_ACCESS_FAILURE'

//actions
const fetchLensAccessCheck = () => {
  console.log('I WAS HERE')
  return {
    type: FETCH_LENS_ACCESS_CHECK
  }
}

const fetchLensAccessRequest = () => {
  return {
    type: FETCH_LENS_ACCESS_REQUEST
  }
}

const fetchLensAccessSuccess = (accessToken : string, userAddress : string) => {
  return {
    type: FETCH_LENS_ACCESS_SUCCESS,
    payload: {
      accessToken,
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


// const pf = {
//   profilePicture: [{}],
// };

// function profilePictureReducer(state = { ...pf }, action: pfAction) {
//   const { type, payload } = action;

//   switch (type) {
//     case 'getPf': {
//       return {
//         ...state,
//         user: payload.profilePicture,
//       };
//     }
//     default:
//       return state;
//   }
// }

export function reducer(state = { ...initialState }, action: LensAccessAction) {
  const { type, payload } = action;

  switch (type) {
    case 'login': {
      localStorage.setItem('user', payload.user);
      return {
        ...state,
        user: payload.user,
      };
    }
    case 'logout': {
      localStorage.removeItem('user');
      return {
        ...state,
        user: payload.user,
      };
    }
    case FETCH_LENS_ACCESS_CHECK: {
      return {
        ...state,
        loading: true,
      }
    }
    case FETCH_LENS_ACCESS_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_LENS_ACCESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        lensAccessToken: action.payload.accessToken,
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

export const fetchLensAccess = (address: string, library: Web3Provider, accessToken: string) => {
  return (dispatch: any) => {
    dispatch(fetchLensAccessCheck())
    lens.checkAccess(address, accessToken).then(res => {
      if (res) {
        console.log(res)
        dispatch(fetchLensAccessSuccess(res.accessToken, address))
      } else {
        dispatch(fetchLensAccessRequest())
        lens.getAccess(address, library).then(res => {
          console.log(res)
          if (res && res.data.authenticate.accessToken) {
            dispatch(fetchLensAccessSuccess(res.data.authenticate.accessToken, address))
          } else {
            dispatch(fetchLensAccessFailure('Something is wrong in fetchLensAccess'))
          }
          
        }).catch(err => {
          console.log(err)
          dispatch(fetchLensAccessFailure(err))
        })
      }
    }).catch(err => {
      dispatch(fetchLensAccessFailure(err))
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