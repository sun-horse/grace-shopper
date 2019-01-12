import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_PRODUCT = 'GOT_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = {}

/**
 * ACTION CREATORS
 */
const gotProduct = product => ({type: GOT_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const fetchProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(gotProduct(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.product
    default:
      return state
  }
}
