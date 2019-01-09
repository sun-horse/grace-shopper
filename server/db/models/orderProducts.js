const Sequelize = require('sequelize')
const db = require('../db')

const OrderProducts = db.define('orderProducts', {})

module.exports = OrderProducts
