const router = require('express').Router()
const {Product, OrderProduct, Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.orderId) {
      const order = await Order.create()
      const products = req.body.products

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

      await order.update({
        isActive: false,
        finalizedAt: new Date()
      })
      res.send(order)
    }
  } catch (err) {
    next(err)
  }
})
