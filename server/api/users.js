const router = require('express').Router()
const {User, OrderProduct} = require('../db/models')

module.exports = router

router.get('/:userId/orders', async (req, res, next) => {
  try {
    let cart
    if (req.user) {
      const user = await User.findById(req.params.userId)
      cart = await user.getCart()
    } else {
      cart = undefined
    }
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
