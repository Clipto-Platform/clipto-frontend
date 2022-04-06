import { combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getAllCreatorsUserName, getTwitterData } from '../api';

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
export interface UserState {
  user: string | null;
}

const initialState = {
  user: localStorage.getItem('user'),
};

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

export default function reducer(state = { ...initialState }, action: Action) {
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
    default:
      return state;
  }
}

// export const allReducer = combineReducers({
//   user: reducer,
//   profilePicture: profilePictureReducer,
// });
