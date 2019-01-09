const Sequelize = require('sequelize')
const db = require('../db')

const OrderProducts = db.define('order-products', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: Sequelize.INTEGER
})

module.exports = OrderProducts
