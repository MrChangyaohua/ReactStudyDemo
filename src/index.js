import React from 'react';
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './container/App'
import reducer from './reducers'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.getElementById('app')
)