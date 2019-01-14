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
        price: 690
      }).then(product => product.addOrders(order))

      const product2 = await Product.create({
        name: 'soothing balm',
        price: 350
      }).then(product => product.addOrders(order))

      const order2 = await Order.create({isActive: false})
    } catch (err) {
      console.log(err.message)
    }
  })

  describe('returnCartObject()', () => {
    it('returns', async () => {
      const orderProducts = await OrderProduct.getProductsByOrderId(3)
      // const orderProducts = await Order.findById(2).then(order =>
      //   order.returnCartObject()
      // )
      console.log(orderProducts)
    })
  })

  xdescribe('Order: Instance method `getProducts`', () => {
    it('returns and object with the array of products and the orderId', async () => {
      const order = await Order.findById(1)
      const orderProducts = await order.getProducts()

      // console.log(orderProducts)

      expect(orderProducts).to.be.an('array')
      expect(orderProducts).to.have.lengthOf(2)
    })
  })

  xdescribe('Order: Instance method `getTotal`', () => {
    it('returns the total of the order when quantity of each item is 1', async () => {
      const order = await Order.findById(1)
      const orderProductsInstance = await order.getProducts()
      const orderTotal = await order.getTotal(orderProductsInstance.products)

      expect(orderTotal).to.be.a('number')
      expect(orderTotal).to.equal(1040)
    })
  })

  xdescribe('Order-Product: Class method `getProductsByOrderId`', () => {
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
