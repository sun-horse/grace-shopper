const router = require('express').Router()
const {User, Order, OrderProduct} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const cart = await user.getCart()
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/cart', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const cart = await Order.create({
      userId: user.id
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
