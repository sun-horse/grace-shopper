const {expect} = require('chai')
const db = require('../index')
const {User, Product, Order, OrderProducts} = require('./index')

describe('Order model', () => {
  beforeEach(async () => {
    try {
      const order = await Order.create({isActive: false})

      const product1 = await Product.create({
        name: 'glitter paint',
        price: 690
      }).then(product => product.addOrders(order))

      const product2 = await Product.create({
        name: 'soothing balm',
        price: 350
      }).then(product => product.addOrders(order))

      const orderProducts = await order.getProducts()

      const orderTotal = await order.getTotal(orderProducts)

      console.log(orderTotal)
    } catch (err) {
      console.log(err.message)
    }
  })

  describe('Instance method `getProducts`', () => {
    it('returns an array of products', () => {})
  })

  describe('Instance method `getTotal`', () => {})
})
