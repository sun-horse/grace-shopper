'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

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
  const newUser = await User.findById(2)
  const newOrder = await Order.create({isActive: false})
  newUser.addOrders(newOrder)

  // Add items to Order-Products list
  await Product.findById(3).then(product => product.addOrders(newOrder))

  await Product.findById(2).then(product => product.addOrders(newOrder))

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
