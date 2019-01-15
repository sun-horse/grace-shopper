import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_ITEM = 'ADD_ITEM'
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'

/**
 * INITIAL STATE
 */
export const defaultCart = {
  products: [],
  orderId: null
}

/**
 * ACTION CREATORS
 */
const addItem = item => ({type: ADD_ITEM, item})
export const getCart = cart => ({type: GET_CART, cart})
export const clearCart = () => ({type: CLEAR_CART})

/**
 * THUNK CREATORS
 */

export const addToCart = (
  item,
  userId,
  orderId,
  actionToken
) => async dispatch => {
  try {
    if (userId) {
      await axios.put(`/api/users/${userId}/cart`, {item, orderId})
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
        // otherwise, update product quantity and get the cart
        if (actionToken) {
          // update cart action
          localCart.products[itemIndex].quantity = item.quantity
        } else {
          // add to existing quantity
          localCart.products[itemIndex].quantity += item.quantity
        }
        dispatch(getCart(localCart))
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

export const checkoutCart = (userId, cart) => async dispatch => {
  try {
    if (userId) {
      // TODO: checkout for logged in users
    } else {
      const response = await axios.post('/api/checkout', cart)
      window.localStorage.clear()
      dispatch(clearCart())
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
    case GET_CART:
      return action.cart
    case CLEAR_CART:
      return defaultCart
    default:
      return state
  }
}
