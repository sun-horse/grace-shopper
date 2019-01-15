const router = require('express').Router()
const {Product, OrderProduct, Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    // console.log(req)
    // const order = await Order.findCreateFind({where: {id: 1}})
    const order = await Order.create()
    await Product.findById(1).then(product => product.addOrders(order))
    // await order.update({
    //   isActive: false,
    //   finalizedAt: new Date()
    // })
    res.send(order)
  } catch (err) {
    next(err)
  }
})
