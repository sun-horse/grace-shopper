const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
// const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  xdescribe('/api/products', () => {
    const freeSample = {
      name: 'Test Size',
      price: 0
    }

    beforeEach(() => {
      return Product.create(newProduct)
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('')
    })
  })
})
