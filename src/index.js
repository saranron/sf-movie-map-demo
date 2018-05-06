import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

const mountNode = document.getElementById('root');

ReactDOM.render(
  <div className="app-container">
    <div className="header">SF Movie Map</div>
    <App />
  </div>,
  mountNode,
);

registerServiceWorker();
