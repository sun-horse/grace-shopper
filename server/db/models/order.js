const Sequelize = require('sequelize')
const db = require('../db')
const OrderProduct = require('./orderProduct')
const Product = require('./product')

const Order = db.define('orders', {
  isActive: Sequelize.BOOLEAN,
  finalizedAt: Sequelize.DATE,
  total: Sequelize.INTEGER
})

// Instance method
Order.prototype.getProducts = function() {
  return OrderProduct.getProductsById(this.dataValues.id)
}

// Order.prototype.getTotal = function(productList) {
//   return productList.reduce((acc, product) => {
//     return acc + product.price
//   }, 0)
// }

module.exports = Order
