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

router.put('/:userId/cart', async (req, res, next) => {
  try {
    const item = req.body.item
    const orderId = req.body.orderId
    const productId = item.id
    const user = await User.findById(req.params.userId)

    // if the item is already in the cart, update its quantity
    const existingItem = await OrderProduct.findOne({
      where: {orderId, productId}
    })
    console.log('existing item is: ', existingItem)
    if (existingItem) {
      const quantity = existingItem.quantity + item.quantity
      console.log('new quantity: ', quantity)
      await existingItem.update({quantity})
    } else {
      console.log('order ID is: ', orderId)
      await OrderProduct.create({
        quantity: item.quantity,
        productId,
        orderId
      })
    }

    // get the updated cart
    const cart = await user.getCart()
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
