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
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0012/8168/7600/products/GPA---Silver-Holographic-Stars-_-Moons_3e431705-e893-4ae8-9397-fc53fb61e73a_1000x.jpg?v=1545306524',
      description: loremHipsum(),
      inventory: 5
    }),
    Product.create({
      name: 'Soothing Balm',
      price: 350,
      imageUrl:
        'https://www.rituals.com/dw/image/v2/BBKL_PRD/on/demandware.static/-/Sites-rituals-products/default/dw2af68f6e/images/zoom/019461_MagicBalm1PRO.png?sw=500&sh=500&sm=fit&q=100',
      description: loremHipsum(),
      inventory: 0
    }),
    Product.create({
      name: 'Flying Dust',
      price: 1000,
      imageUrl:
        'http://mysticinvestigations.com/paranormal/wp-content/uploads/2017/07/FairyDust.jpg',
      description: loremHipsum()
    }),
    Product.create({
      name: 'Hoof Oil',
      price: 500,
      imageUrl:
        'https://img.smartpak.com/images/product/highres/19729_16oz.jpg?width=460',
      description: loremHipsum()
    }),
    Product.create({
      name: 'Mane Mask',
      price: 850,
      imageUrl:
        'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR4BYst9diRW248sSjZtuGCecJ1kSQDdGUGjf-W-fcNW9FHX7CbevEH8cnyhkf2e4uAoZtI8YGzwodLIdvILzhnRpogwdXp-3rfDJ5KDdWQuqSzb2Ndg6tR&usqp=CAE',
      description: loremHipsum()
    }),
    Product.create({
      name: 'Festival Flower Crown',
      price: 1995,
      imageUrl:
        'https://i.etsystatic.com/6619524/r/il/57e222/1674394329/il_570xN.1674394329_hc0x.jpg',
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
