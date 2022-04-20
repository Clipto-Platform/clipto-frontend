import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en'; // locale-data for en
import './styles/resets.css';
import './styles/base.css';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store';
import { Provider } from 'react-redux';
// Workaround for walletconnect + vite build problem
import { Buffer } from 'buffer';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).global = window;
window.Buffer = window.Buffer || Buffer;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
