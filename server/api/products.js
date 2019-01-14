const router = require('express').Router()
const {Product, OrderProduct} = require('../db/models')
module.exports = router

// all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'imageUrl', 'description']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// single product
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId, {
      attributes: ['id', 'name', 'price', 'imageUrl', 'description']
    })
    if (product) {
      res.json(product)
    } else {
      res.status(401).send('Nothing found here, go to store front')
    }
  } catch (err) {
    next(err)
  }
})

// security check pending
router.post('/', async (req, res, next) => {
  try {
    await OrderProduct.create({
      orderId: req.body.orderId,
      productId: req.body.productId
    })
    res.status(201)
    res.json('Product added to order')
  } catch (err) {
    next(err)
  }
})
