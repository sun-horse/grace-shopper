const router = require('express').Router()
const {User} = require('../db/models')
const {Order} = require('../db/models')
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

router.post('/api/users/:userId/orders?isActiv', async (req, res, next) => {
  try {
    const existingOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        isActiv: true
      }
    })
    if (existingOrder) {
      res.json(existingOrder)
    } else {
      Order.create({
        userId: req.params.userId,
        isActiv: true
      })
      const newOrder = await Order.findOne({
        where: {
          userId: req.params.userId,
          isActiv: true
        }
      })
      res.json(newOrder)
    }
  } catch (err) {
    next(err)
  }
})
