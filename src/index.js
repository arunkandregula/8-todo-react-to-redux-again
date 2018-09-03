import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import Router from './components/Router/Router';
ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
registerServiceWorker();
