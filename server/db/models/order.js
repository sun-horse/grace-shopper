const Sequelize = require('sequelize')
const db = require('../db')
const OrderProduct = require('./orderProduct')

const Order = db.define('orders', {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  finalizedAt: Sequelize.DATE,
  total: Sequelize.INTEGER
})

// Instance method
// Order.prototype.getProducts = function() {
//   return OrderProduct.getProductsById(this.dataValues.id)
// }

// Instance method -- does not account for quantity
Order.prototype.getTotal = function(productArr) {
  return productArr.reduce((acc, product) => {
    return acc + product.price
  }, 0)
}

module.exports = Order
