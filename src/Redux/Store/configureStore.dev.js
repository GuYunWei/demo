import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
// import api from '../middleware/api'
import * as reducer from '../Reducer'
import DevTools from '../../Container/DevTools'
import { routerReducer as routing } from 'react-router-redux'

const rootReducer = combineReducers({
  ...reducer,
  routing
})

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      // applyMiddleware(thunk, api, createLogger()),
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../Reducer', () => {
      const nextRootReducer = require('../Reducer').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
