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
export const updateItemQuantity = item => ({
  type: UPDATE_ITEM_QUANTITY,
  item,
  quantity: item.quantity
})
const getCart = cart => ({type: GET_CART, cart, orderId: cart.orderId})

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
    let cart
    if (userId) {
      const res = await axios.get(`/api/users/${userId}/cart`)
      cart = res.data
    } else {
      // get cart from local storage
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
    // case UPDATE_ITEM_QUANTITY:
    //   let indexOfItem
    //   const itemToUpdate = state.products.filter(
    //     product => product.id === action.item.id
    //   )
    //   itemToUpdate.quantity += action.quantity
    //   return {...state, products: [...state.products]}
    default:
      return state
  }
}
