import React from 'react';
import { Provider } from 'react-redux';
import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import App from './app/App';
import './styles/global.sass';
import store, { history } from './redux/store';
import { ConnectedRouter } from 'connected-react-router';


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
