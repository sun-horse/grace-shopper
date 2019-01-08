/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('products')

describe('Product model', () => {
  describe('Validations', () => {
    it('requires `name`', async () => {
      const product = Product.build()

      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })

    it('requires `name` to not be an empty string', async () => {
      const product = Product.build({
        name: ''
      })

      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed if name is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
        /* handle error */
      }
    })

    it('requires `price`', async () => {
      const product = Product.build()

      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `price`'
        )
      } catch (err) {
        expect(err.message).to.contain('price cannot be null')
      }
    })
  })
})
