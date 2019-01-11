/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchProducts} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('product thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchProducts', () => {
    it('eventually dispatches the GET PRODUCTS action', async () => {
      const fakeProduct = {name: 'Fake Glitter', price: 100, quantity: 1}
      const fakeProducts = [fakeProduct]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProducts)
    })
  })
})
