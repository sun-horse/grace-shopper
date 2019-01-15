import {expect} from 'chai'
import reducer from './cart'

describe('cart reducer', () => {
  const initialCart = {
    orderId: null,
    products: []
  }

  const glitterPaint = {
    name: 'glitter paint',
    price: 690,
    description: 'Test desc'
  }
  const soothingBalm = {
    name: 'soothing balm',
    price: 350,
    description: 'Test desc'
  }

  const updatedCart = reducer(initialCart, {
    type: 'ADD_ITEM',
    payload: {
      item: {
        orderId: 3,
        products: [glitterPaint]
      }
    }
  })

  // Expect last item to be the one just added
  // This can change later
  xit('returns a new state with the updated cart', () => {
    expect(updatedCart.products).to.have.length.of(1)
    expect(updatedCart.slice(-1)[0]).to.deep.equal({
      orderId: 3,
      products: [glitterPaint]
    })
  })

  const addOneMore = reducer(updatedCart, {
    type: 'ADD_ITEM',
    payload: {
      item: {
        orderId: 3,
        products: [soothingBalm]
      }
    }
  })

  xit('can add multiple items', () => {
    expect(addOneMore.products).to.have.length.of(2)
    expect(addOneMore).to.deep.equal({
      orderId: 3,
      products: [glitterPaint, soothingBalm]
    })
  })

  xit('does not modify the previous state', () => {
    expect(initialCart).to.deep.equal({
      orderId: null,
      products: []
    })
    expect(updatedCart).to.deep.equal([glitterPaint])
  })
})
