const {expect} = require('chai')
const db = require('../index')
const Product = db.model('products')
const Order = db.model('orders')
const OrderProduct = db.model('order-products')

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

  describe('returnCartObject(): Order instance method', () => {
    it('returns', async () => {
      // const orderProducts = await OrderProduct.getProductsByOrderId(2)
      const orderProducts = await Order.findById(2).then(order =>
        order.returnCartObject()
      )
      console.log(orderProducts)
    })
  })

  xdescribe('getProductsByOrderId(): Order-products class method', () => {
    it('returns the same information as the Order Instance method', async () => {
      const order = await Order.findById(1)
      const orderProductsInstance = await order.getProducts()

      // console.log(orderProductsInstance)

      const orderProductsClass = await OrderProduct.getProductsByOrderId(1)

      console.log(orderProductsClass)

      expect(typeof orderProductsInstance).to.equal(typeof orderProductsClass)

      expect(orderProductsInstance).to.equal(orderProductsClass)

      expect(orderProductsInstance.length).to.equal(orderProductsClass.length)
    })
  })
})
