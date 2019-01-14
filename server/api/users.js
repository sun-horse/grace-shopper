const router = require('express').Router()
const {User} = require('../db/models')
const {Order, OrderProduct} = require('../db/models')

module.exports = router

router.get('/:userId/orders', async (req, res, next) => {
  try {
    const existingOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        isActive: true
      }
    })
    if (existingOrder) {
      const orderProducts = await OrderProduct.getProductsById(existingOrder.id)
      res.json(orderProducts)
    } else {
      Order.create({
        userId: req.params.userId,
        isActive: true
      })
      const newOrder = await Order.findOne({
        where: {
          userId: req.params.userId,
          isActive: true
        }
      })
      res.json(newOrder)
    }
  } catch (err) {
    next(err)
  }
})
