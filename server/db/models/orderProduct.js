const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')

const OrderProduct = db.define('order-products', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  itemPrice: Sequelize.INTEGER
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
      // Returns an empty array and null orderId if we try to get the products of a non-existent order
      orderId = null
    }

    return {products, orderId}
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = OrderProduct
