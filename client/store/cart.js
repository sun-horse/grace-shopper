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
    const localCart = JSON.parse(window.localStorage.getItem('cart'))
    // if user is logged in
    if (userId) {
      // TODO: api route that just returns the orderId based on userId?
      const getResponse = await axios.get(`/api/users/${userId}/cart`)
      const orderId = getResponse.data.orderId

      // if there are products in local storage, add them all to user's cart
      // then clear local storage!
      if (localCart && localCart.products && localCart.products.length > 0) {
        const localProducts = localCart.products
        let putResponse
        for (let i = 0; i < localProducts.length; i++) {
          const item = localProducts[i]
          putResponse = await axios.put(`/api/users/${userId}/cart`, {
            item,
            orderId
          })
        }
        window.localStorage.clear()
        dispatch(getCart(putResponse.data))
      } else {
        dispatch(getCart(getResponse.data))
      }
    } else {
      // if user is not logged in, get cart from local storage
      // create the cart key on local storage first if needed
      if (!localCart) {
        window.localStorage.setItem('cart', JSON.stringify(defaultCart))
      }
      dispatch(getCart(JSON.parse(window.localStorage.getItem('cart'))))
    }
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCart = (item, orderId, userId) => async dispatch => {
  try {
    if (userId) {
      await axios.delete(`api/users/${userId}/cart`, {data: {item, orderId}})
    } else {
      const localCart = JSON.parse(window.localStorage.getItem('cart'))
      const products = localCart.products
      const updatedProducts = products.filter(product => {
        if (product.id !== item.id) {
          return product
        }
      })
      localCart.products = updatedProducts
      dispatch(getCart(localCart))
      window.localStorage.setItem('cart', JSON.stringify(localCart))
    }
  } catch (err) {
    console.error(err)
  }
}

export const checkoutCart = (userId, cart) => async dispatch => {
  try {
    const response = await axios.post('/api/checkout', {userId, cart})
    if (!userId) window.localStorage.clear()
    dispatch(clearCart())
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
