const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')
const OrderProducts = require('./orderProducts')
const Products = require('./product')

const Order = db.define('orders', {
  isActive: Sequelize.BOOLEAN,
  finalizedAt: Sequelize.DATE
})

Order.prototype.getProducts = async function() {
  const orderProducts = await OrderProducts.findAll({
    where: {orderId: this.dataValues.id}
  }).map(obj => obj.dataValues.productId)

  const ProductList = await Products.findAll({
    where: {
      id: {
        [Op.in]: orderProducts
      }
    }
  })

  return ProductList.map(obj => obj.dataValues)
}

module.exports = Order
