/**
 * ACTION TYPES
 */
const ADD_ITEM = 'ADD_ITEM'

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

/**
 * THUNK CREATORS
 */
export const setCart = item => async dispatch => {
  try {
    const orderId = await axios.get('/api/users/:userId/orders')

    const productOrder = {...item, orderId: orderId}
    const res = await axios.post('/api/products', productOrder)
    dispatch(addItem(res.data))
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
      return [...state, action.item]
    default:
      return state
  }
}
