/**
 * ACTION TYPES
 */
const ADD_ITEM = 'ADD_ITEM'
const GET_CART = 'GET_CART'

import axios from 'axios'
import {runInNewContext} from 'vm'

/**
 * INITIAL STATE
 */
const defaultCart = {
  orderId: null,
  products: []
}

/**
 * ACTION CREATORS
 */
const addItem = item => ({type: ADD_ITEM, item})
const getCart = cart => ({type: GET_CART, cart})

/**
 * THUNK CREATORS
 */

export const addToOrder = () => async dispatch => {
  try {
    await axios.post('/api/users/:userId/orders')
  } catch (err) {
    console.error(err)
  }
}

export const setCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/:userId/orders')
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

//[{productName: 'glitter', productId: 3, orderId: 5 }]

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return {orderId: action.cart[0].orderId, products: action.cart}
    case ADD_ITEM:
      return {...state, products: [...state.products, action.item]}
    default:
      return state
  }
}
