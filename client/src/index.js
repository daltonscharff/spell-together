import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import './index.css';
import App from './App';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000');

ReactDOM.render(
  <React.StrictMode>
    <App
      socket={socket}
    />
  </React.StrictMode>,
  document.getElementById('root')
);