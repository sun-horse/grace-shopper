const Sequelize = require('sequelize')
const db = require('../db')
const OrderProducts = require('./orderProducts')
const Products = require('./product')

const Order = db.define('orders', {
  isActive: Sequelize.BOOLEAN,
  finalizedAt: Sequelize.DATE
})

module.exports = Order
