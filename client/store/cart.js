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
const getCart = cart => ({type: GET_CART, cart, orderId: cart.orderId})

/**
 * THUNK CREATORS
 */

export const createCart = userId => async dispatch => {
  try {
    if (userId) {
      await axios.post(`/api/${userId}/cart`)
    }
  } catch (err) {
    console.error(err)
  }
}

export const addToCart = (item, userId) => async dispatch => {
  try {
    await axios.post(`/api/${userId}/orders`, item)
    dispatch(addItem(item))
  } catch (err) {
    console.error(err)
  }
}

export const setCart = userId => async dispatch => {
  try {
    let cart
    if (userId) {
      const res = await axios.get(`/api/users/${userId}/cart`)
      cart = res.data
    } else {
      // get cart from local storage
      console.log('not logged in, need to get cart from local storage!')
      cart = {products: [], orderId: null}
    }
    dispatch(getCart(cart))
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
