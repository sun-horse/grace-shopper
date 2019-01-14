const Sequelize = require('sequelize')
const db = require('../db')
const Op = Sequelize.Op
const Product = require('./product')
const Order = require('./order')

const OrderProduct = db.define('order-products', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

OrderProduct.getProductsByOrderId = async function(orderId) {
  try {
    const order = await Order.findById(orderId)
    let products = []

    if (order) {
      products = await order
        .getProducts()
        .then(list => (list ? list.map(product => product.dataValues) : []))
    } else {
      orderId = null
    }

    return {products, orderId}
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = OrderProduct
