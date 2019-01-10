const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const OrderProducts = db.define('order-products', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = OrderProducts
