const router = require('express').Router()
const {Product, OrderProduct, Order, User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const products = req.body.cart.products
    let order = {}

    // If there is no orderId, aka if its a guest user
    if (!req.body.cart.orderId) {
      order = await Order.create()

      products.forEach(async product => {
        // TODO: Make sure we can't buy products if the quantity would make the inventory negative
        await Product.findById(product.id)
          .then(productInstance =>
            productInstance.update({
              inventory: productInstance.inventory - product.quantity
            })
          )
          .then(productInstance => productInstance.addOrders(order))
      })
      // Logged in users
    } else {
      ;[order] = await Order.findOrCreate({
        where: {
          id: req.body.cart.orderId,
          isActive: true
        }
      })

      products.forEach(async product => {
        // TODO: Make sure we can't buy products if the quantity would make the inventory negative
        await Product.findById(product.id).then(productInstance =>
          productInstance.update({
            inventory: productInstance.inventory - product.quantity
          })
        )
      })

      const user = await User.findById(req.body.userId)
      const newCart = await Order.create().then(order => user.addOrders(order))
    }

    await order.update({
      isActive: false,
      finalizedAt: new Date()
    })
    res.send(order)
  } catch (err) {
    next(err)
  }
})
