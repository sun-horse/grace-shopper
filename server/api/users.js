const router = require('express').Router()
const {User, OrderProduct} = require('../db/models')

module.exports = router

const sameUser = (req, res, next) => {
  if (Number(req.params.userId) === req.user.id) {
    next()
  } else {
    res.sendStatus(403)
  }
}

router.get('/:userId/cart', sameUser, async (req, res, next) => {
  try {
    let cart = null
    if (req.user) {
      const user = await User.findById(req.params.userId)
      cart = await user.getCart()
    }
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/cart', sameUser, async (req, res, next) => {
  try {
    const item = req.body.item
    const orderId = req.body.orderId
    const actionToken = req.body.actionToken
    const productId = item.id
    const user = await User.findById(req.params.userId)

    // if the item is already in the cart, update its quantity
    const existingItem = await OrderProduct.findOne({
      where: {orderId, productId}
    })
    if (existingItem) {
      let quantity
      if (actionToken) {
        // update quantity button in <Cart />
        quantity = item.quantity
      } else {
        // add to cart button in <AllProducts />
        quantity = existingItem.quantity + item.quantity
      }
      await existingItem.update({quantity})
    } else {
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
