import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import cart from './cart'
import product from './singleProduct'

const reducer = combineReducers({user, products, cart, product})
const middleware =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(
        applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
      )
    : applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './cart'
export * from './singleProduct'
