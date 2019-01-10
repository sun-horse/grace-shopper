const {expect} = require('chai')
const db = require('../index')
const {User, Product, Order, OrderProducts} = require('./index')

describe('Order', () => {
  beforeEach(async () => {
    const users = await Promise.all([
      User.create({email: 'cody@email.com', password: '123'}),
      User.create({email: 'murphy@email.com', password: '123'})
    ])
    const products = await Promise.all([
      Product.create({name: 'glitter paint', price: 690}),
      Product.create({name: 'soothing balm', price: 350}),
      Product.create({name: 'flying dust', price: 1000})
    ])

    // Seed association tables
    const newOrder = await Order.create({isActive: false})

    const newUser = await User.findById(2)
    await newUser.addOrders(newOrder)

    await Product.findById(3).then(product => product.addOrders(newOrder))

    await Product.findById(2).then(product => product.addOrders(newOrder))
  })

  xdescribe('Instance method `getTotal`', () => {
    it('finds gets the order total', async () => {
      const firstOrder = await Order.findById(1)
      const total = await firstOrder.getTotal()

      console.log(total)
    })
  })
})
