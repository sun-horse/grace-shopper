const {expect} = require('chai')
const db = require('../index')
const Order = db.model('orders')
const OrderProducts = db.model('order-products')

describe('Order', () => {
  beforeEach(async () => {
    const firstOrder = await Order.create({
      userId: 1,
      isActive: false,
      finalizedAt: new Date()
    })

    const firstOrderProducts = await OrderProducts.create({
      orderId: 1,
      userId: 1,
      quantity: 5,
      productId: 1
    })
  })

  describe('Instance method `getTotal`', () => {
    it('finds gets the order total', async () => {
      const order = await Order.findById(1)
      console.log(order)
    })
  })
})
