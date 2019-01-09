const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  isActive: Sequelize.BOOLEAN,
  finalizedAt: Sequelize.DATE
})

module.exports = Order
