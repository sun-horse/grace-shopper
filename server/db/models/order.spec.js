const {expect} = require('chai')
const db = require('../index')
const {User, Product, Order, OrderProducts} = require('./index')

describe('Order', () => {
  beforeEach(async () => {})

  xdescribe('Instance method `getTotal`', () => {
    it('finds gets the order total', async () => {
      const firstOrder = await Order.findById(1)
      const total = await firstOrder.getTotal()

      console.log(total)
    })
  })
})
