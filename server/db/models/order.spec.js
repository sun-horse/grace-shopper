const {expect} = require('chai')
const db = require('../index')
const Product = db.model('products')
const Order = db.model('orders')
const OrderProduct = db.model('order-products')

describe('Order and  Order-products model', () => {
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

      const orderProductsInstance = await order.getProducts()

      const orderTotal = await order.getTotal(orderProductsInstance.products)
    } catch (err) {
      console.log(err.message)
    }
  })

  describe('Instance method `getProducts`', () => {
    it('returns an array of products', () => {})
  })

  describe('Instance method `getTotal`', () => {})
})
