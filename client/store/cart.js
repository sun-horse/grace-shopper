/**
 * ACTION TYPES
 */
const ADD_ITEM = 'ADD_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
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
const addItem = item => ({type: ADD_ITEM, item})
export const updateItemQuantity = () => ({})

const getCart = cart => ({type: GET_CART, cart})

/**
 * THUNK CREATORS
 */

export const addToCart = (item, userId, orderId) => async dispatch => {
  try {
    if (userId) {
      await axios.put(`/api/users/${userId}/cart`, {item, orderId})
    } else {
      //update local storage
    }
    dispatch(addItem(item))
  } catch (err) {
    console.error(err)
  }
}

export const setCart = userId => async dispatch => {
  try {
    if (userId) {
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(getCart(data))
    } else {
      // get cart from local storage instead
      if (!window.localStorage.getItem('cart')) {
        window.localStorage.setItem('cart', JSON.stringify(defaultCart))
      }
      const localCart = JSON.parse(window.localStorage.getItem('cart'))
      dispatch(getCart(localCart))
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {...state, products: [...state.products, action.item]}
    case UPDATE_ITEM_QUANTITY:
      return state
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
