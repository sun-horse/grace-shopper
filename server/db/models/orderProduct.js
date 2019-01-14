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

    if (order) {
      // If order exists, call the instance method returnCartObject() and return the result
      const orderObject = await order.returnOrderObject()
      return orderObject
    } else {
      // Returns an empty array and null orderId if we try to get the products of a non-existent order
      return {products: [], orderId: null}
    }
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = OrderProduct
