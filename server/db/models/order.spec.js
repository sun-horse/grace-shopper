const {expect} = require('chai')
const db = require('../index')
const Order = db.model('orders')
const OrderProducts = db.model('order-products')
const User = db.model('users')
const Product = db.model('products')

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

    const newProduct = await Product.findById(3)
    await newProduct.addOrders(newOrder)
  })

  describe('Instance method `getTotal`', () => {
    it('finds gets the order total', async () => {
      const orders = await OrderProducts.findAll()
      console.log(orders)
    })
  })
})
