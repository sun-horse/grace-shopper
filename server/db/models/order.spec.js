const {expect} = require('chai')
const db = require('../index')
const Product = db.model('products')
const Order = db.model('orders')
const OrderProduct = db.model('order-products')

describe('Order and Order-products model', () => {
  beforeEach(async () => {
    try {
      const order = await Order.create({isActive: false})

      const product1 = await Product.create({
        name: 'glitter paint',
        price: 690,
        description: 'Test desc'
      }).then(product => product.addOrders(order))

      const product2 = await Product.create({
        name: 'soothing balm',
        price: 350,
        description: 'Test desc'
      }).then(product => product.addOrders(order))
    } catch (err) {
      console.log(err.message)
    }
  })

  describe('Order: Instance method `getProducts`', () => {
    it('returns and object with the array of products and the orderId', async () => {
      const order = await Order.findById(1)
      const orderProductsInstance = await order.getProducts()

      expect(orderProductsInstance).to.be.an('object')
      expect(orderProductsInstance.products).to.be.an('array')
      expect(orderProductsInstance.orderId).to.be.a('number')
      expect(orderProductsInstance.orderId).to.equal(1)
    })
  })

  describe('Order: Instance method `getTotal`', () => {
    it('returns the total of the order when quantity of each item is 1', async () => {
      const order = await Order.findById(1)
      const orderProductsInstance = await order.getProducts()
      const orderTotal = await order.getTotal(orderProductsInstance.products)

      expect(orderTotal).to.be.a('number')
      expect(orderTotal).to.equal(1040)
    })
  })

  describe('Order-Product: Class method `getProductsById`', () => {
    it('returns the same information as the Order Instance method', async () => {
      const order = await Order.findById(1)
      const orderProductsInstance = await order.getProducts()
      const orderProductsClass = await OrderProduct.getProductsById(1)

      expect(typeof orderProductsInstance).to.equal(typeof orderProductsClass)

      expect(orderProductsInstance.orderId).to.equal(orderProductsClass.orderId)

      expect(orderProductsInstance.products.length).to.equal(
        orderProductsClass.products.length
      )
    })
  })
})
