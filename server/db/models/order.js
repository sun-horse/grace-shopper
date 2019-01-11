const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')
const OrderProduct = require('./orderProduct')
const Product = require('./product')

const Order = db.define('orders', {
  isActive: Sequelize.BOOLEAN,
  finalizedAt: Sequelize.DATE,
  total: Sequelize.INTEGER
})

// Instance method
Order.prototype.getProducts = async function() {
  try {
    const orderProducts = await OrderProduct.findAll({
      where: {orderId: this.dataValues.id}
    }).map(obj => obj.dataValues.productId)

    const ProductList = await Product.findAll({
      where: {
        id: {
          [Op.in]: orderProducts
        }
      }
    })

    return ProductList.map(obj => obj.dataValues)
  } catch (err) {
    console.log(err.message)
  }
}

Order.prototype.getTotal = function(productList) {
  return productList.reduce((acc, product) => {
    return acc + product.price
  }, 0)
}

module.exports = Order
