import {expect} from 'chai'
import reducer from './cart'

describe('cart reducer', () => {
  const initialCart = []

  const glitterPaint = {name: 'glitter paint', price: 6.9}
  const soothingBalm = {name: 'soothing balm', price: 3.5}

  const updatedCart = reducer(initialCart, {
    type: 'ADD_ITEM',
    item: glitterPaint
  })

  // Expect last item to be the one just added
  // This can change later
  it('returns a new state with the updated cart', () => {
    expect(updatedCart).to.have.length.of(1)
    expect(updatedCart.slice(-1)[0]).to.deep.equal(glitterPaint)
  })

  const addOneMore = reducer(updatedCart, {
    type: 'ADD_ITEM',
    item: soothingBalm
  })

  it('can add multiple items', () => {
    expect(addOneMore).to.have.length.of(2)
    expect(addOneMore).to.deep.equal([glitterPaint, soothingBalm])
  })

  it('does not modify the previous state', () => {
    expect(initialCart).to.deep.equal([])
    expect(updatedCart).to.deep.equal([glitterPaint])
  })
})
