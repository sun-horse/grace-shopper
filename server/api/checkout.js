const router = require('express').Router()
const {Product, OrderProduct, Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const [order] = await Order.findOrCreate({
      where: {id: req.body.orderId, isActive: true}
    })
    const products = req.body.products

    products.forEach(async product => {
      await Product.findById(product.id).then(product =>
        product.addOrders(order)
      )
    })
    // await order.update({
    //   isActive: false,
    //   finalizedAt: new Date()
    // })
    res.send(order)
  } catch (err) {
    next(err)
  }
})
