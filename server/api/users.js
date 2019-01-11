const router = require('express').Router()
const {User} = require('../db/models')
const {Order, OrderProduct} = require('../db/models')

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

// router.post('/:userId/orders', async (req, res, next) => {
//   try {
//     const orderId = await Order.findOne({
//       where: {
//         userId: req.params.userId
//       }
//     })
//     OrderProducts.create({
//       where: {
//         orderId: orderId,
//         productId: req.body.productId
//       }
//     })
//   } catch (err) {
//     next(err)
//   }
// })
