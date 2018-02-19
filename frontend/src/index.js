import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import App from './app';
import { reducers } from './app/reducers';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
)

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
