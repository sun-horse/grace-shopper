/**
 * ACTION TYPES
 */
const ADD_ITEM = 'ADD_ITEM'
const GET_CART = 'GET_CART'

import axios from 'axios'

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

export const addToCart = (item, userId) => async dispatch => {
  try {
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
