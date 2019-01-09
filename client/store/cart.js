/**
 * ACTION TYPES
 */
const ADD_ITEM = 'ADD_ITEM'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const addItem = item => ({type: ADD_ITEM, item})

/**
 * THUNK CREATORS
 */
export const addItem = item => async dispatch => {
  try {
    const orderId = await axios.get('/api/')
    const res = await axios.post('/api/products')
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
