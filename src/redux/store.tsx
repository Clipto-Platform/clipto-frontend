import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({ 
  reducer: reducer,
});

//store.subscribe(() => { console.log(store.getState())})

export default store
