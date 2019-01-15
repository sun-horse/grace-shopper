const {expect} = require('chai')
const db = require('../index')
const Product = db.model('products')
const Order = db.model('orders')
const OrderProduct = db.model('order_products')

describe('Order and Order-products model', () => {
  beforeEach(async () => {
    try {
      const order1 = await Order.create({isActive: false})

      const product1 = await Product.create({
        name: 'glitter paint',
        price: 690,
        description: 'Test desc'
      }).then(product => product.addOrders(order1))

      const product2 = await Product.create({
        name: 'soothing balm',
        price: 350,
        description: 'Test desc'
      }).then(product => product.addOrders(order1))

      const order2 = await Order.create({isActive: false})
    } catch (err) {
      console.log(err.message)
    }
  })

  describe('returnOrderObject(): Order instance method', () => {
    it('returns an object', async () => {
      const orderProducts1 = await Order.findById(1).then(order =>
        order.returnOrderObject()
      )

      const orderProducts2 = await Order.findById(2).then(order =>
        order.returnOrderObject()
      )
      expect(orderProducts1).to.be.an('object')
      expect(orderProducts2).to.be.an('object')
    })

    it('contains a products array', async () => {
      const orderProducts1 = await Order.findById(1).then(order =>
        order.returnOrderObject()
      )

      const orderProducts2 = await Order.findById(2).then(order =>
        order.returnOrderObject()
      )

      expect(orderProducts1.products).to.be.an('array')
      expect(orderProducts1.products).to.have.lengthOf(2)

      expect(orderProducts2.products).to.be.an('array')
      expect(orderProducts2.products).to.have.lengthOf(0)
    })

    it('contains the orderId', async () => {
      const orderProducts1 = await Order.findById(1).then(order =>
        order.returnOrderObject()
      )

      const orderProducts2 = await Order.findById(2).then(order =>
        order.returnOrderObject()
      )

      expect(orderProducts1.orderId).to.be.a('number')
      expect(orderProducts1.orderId).to.equal(1)

      expect(orderProducts2.orderId).to.be.a('number')
      expect(orderProducts2.orderId).to.equal(2)
    })
  })

  describe('getProductsByOrderId(): Order-products class method', () => {
    it('returns an object', async () => {
      const orderProducts1 = await OrderProduct.getProductsByOrderId(1)

      const orderProducts2 = await OrderProduct.getProductsByOrderId(2)

      const orderProducts3 = await OrderProduct.getProductsByOrderId(3)

      expect(orderProducts1).to.be.an('object')
      expect(orderProducts2).to.be.an('object')
      expect(orderProducts3).to.be.an('object')
    })

    it('returns an array of products', async () => {
      const orderProducts1 = await OrderProduct.getProductsByOrderId(1)

      const orderProducts2 = await OrderProduct.getProductsByOrderId(2)

      const orderProducts3 = await OrderProduct.getProductsByOrderId(99)

      expect(orderProducts1.products).to.be.an('array')
      expect(orderProducts1.products).to.have.lengthOf(2)

      expect(orderProducts2.products).to.be.an('array')
      expect(orderProducts2.products).to.have.lengthOf(0)

      expect(orderProducts3.products).to.be.an('array')
      expect(orderProducts3.products).to.have.lengthOf(0)
    })

    it('returns the orderId', async () => {
      const orderProducts1 = await OrderProduct.getProductsByOrderId(1)

      const orderProducts2 = await OrderProduct.getProductsByOrderId(2)

      const orderProducts3 = await OrderProduct.getProductsByOrderId(99)

      expect(orderProducts1.orderId).to.be.an('number')
      expect(orderProducts1.orderId).to.equal(1)

      expect(orderProducts2.orderId).to.be.an('number')
      expect(orderProducts2.orderId).to.equal(2)

      expect(orderProducts3.orderId).to.equal(null)
    })
  })
})
