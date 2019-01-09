const Sequelize = require('sequelize')
const db = require('../db')
const OrderProducts = require('./orderProducts')

const Order = db.define('orders', {
  isActive: Sequelize.BOOLEAN,
  finalizedAt: Sequelize.DATE
})

// Instance method
Order.prototype.getTotal = async () => {
  const orderList = await OrderProducts.findAll({
    where: {
      id: this.id
    }
  })
}

module.exports = Order
