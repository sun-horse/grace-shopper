/**
 * ACTION TYPES
 */
const ADD_ITEM = 'ADD_ITEM'
const GET_CART = 'GET_CART'

import axios from 'axios'
import user from './user';

/**
 * INITIAL STATE
 */
const defaultCart = {
  products: [],
  orderId: null
}

/**
 * ACTION CREATORS
 */
export const addItem = item => ({type: ADD_ITEM, item})
const getCart = cart => ({type: GET_CART, cart, orderId: cart[0].orderId})

/**
 * THUNK CREATORS
 */

//DO NOT USE YET - need to send arguments to thunk
//TODO #38 - Add arguments...
// 1. *componentDidUpdate()
// 2. *load user with a cart.
// 3. /api/me/cart /api/me/orders


export const addToOrder = (item, userId) => async dispatch => {
  try {
    // if(userId){
    //   await axios.post(`/api/${userId}/orders`, item)
    // } else {
    //   // await localStorage.setItem(...)
    // }
    await axios.post(`/api/${userId}/orders`, item)
    dispatch(addItem(item))
  } catch (err) {
    console.error(err)
  }
}

//DO NOT USE YET - Need to send userId to thunk
export const setCart = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/orders`)
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_ITEM:
      return {...state, products: [...state.products, action.item]}
    default:
      return state
  }
}
