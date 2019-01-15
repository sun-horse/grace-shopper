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
const addItem = item => ({type: ADD_ITEM, payload: {item}})
const updateItemQuantity = (item, index) => ({
  type: UPDATE_ITEM_QUANTITY,
  payload: {item, index}
})
const getCart = cart => ({type: GET_CART, payload: {cart}})

/**
 * THUNK CREATORS
 */

export const addToCart = (item, userId, orderId) => async dispatch => {
  try {
    if (userId) {
      await axios.put(`/api/users/${userId}/cart`, {item, orderId})
      dispatch(addItem(item))
    } else {
      // update cart in local storage
      const localCart = JSON.parse(window.localStorage.getItem('cart'))
      // map array of product objects to array of ids to find the item index
      const itemIndex = localCart.products.map(obj => obj.id).indexOf(item.id)
      if (itemIndex === -1) {
        // if product is not already in local cart, add it
        localCart.products.push(item)
        dispatch(addItem(item))
      } else {
        // otherwise, update product quantity
        localCart.products[itemIndex].quantity += item.quantity
        dispatch(updateItemQuantity(item, itemIndex))
      }
      window.localStorage.setItem('cart', JSON.stringify(localCart))
    }
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
      // get cart from local storage instead (and create the key if needed)
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
  const payload = action.payload
  switch (action.type) {
    case ADD_ITEM:
      return {...state, products: [...state.products, payload.item]}
    case UPDATE_ITEM_QUANTITY: {
      const newProducts = [...state.products]
      newProducts[payload.index].quantity += payload.item.quantity
      return {...state, products: newProducts}
    }
    case GET_CART:
      return payload.cart
    default:
      return state
  }
}
