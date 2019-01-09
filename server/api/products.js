const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

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
