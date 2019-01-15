'use strict'
const hipsum = require('lorem-hipsum')
const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

// generate description
const loremHipsum = () =>
  hipsum({
    count: 3,
    units: 'paragraphs',
    paragraphLowerBound: 3,
    paragraphUpperBound: 15,
    format: 'plain'
  })

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const products = await Promise.all([
    Product.create({
      name: 'Glitter Paint',
      price: 690,
      imageUrl: '/images/glitterpaint.jpg',
      description: loremHipsum(),
      inventory: 5
    }),
    Product.create({
      name: 'Soothing Balm',
      price: 350,
      imageUrl: '/images/magicbalm.png',
      description: loremHipsum(),
      inventory: 0
    }),
    Product.create({
      name: 'Flying Dust',
      price: 1000,
      imageUrl: '/images/flyingdust.jpg',
      description: loremHipsum()
    }),
    Product.create({
      name: 'Hoof Oil',
      price: 500,
      imageUrl: '/images/hoofoil.jgp',
      description: loremHipsum()
    }),
    Product.create({
      name: 'Mane Mask',
      price: 850,
      imageUrl: '/images/manemask.png',
      description: loremHipsum()
    }),
    Product.create({
      name: 'Festival Flower Crown',
      price: 1995,
      imageUrl: '/images/flowercrown.jpg',
      description: loremHipsum()
    })
  ])

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
