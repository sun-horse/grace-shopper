'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderProducts} = require('../server/db/models')

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
  const newOrder = await Order.create({isActive: false})

  const newUser = await User.findById(2)
  await newUser.addOrders(newOrder)

  await Product.findById(3).then(product => product.addOrders(newOrder))

  await Product.findById(2).then(product => product.addOrders(newOrder))

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
