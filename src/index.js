import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
// import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './components/App.jsx'

import * as reducers from './store/reducers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
