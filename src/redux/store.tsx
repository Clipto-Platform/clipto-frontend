import { configureStore } from '@reduxjs/toolkit';
import allReducer from './reducer';

export default configureStore({ reducer: allReducer });
