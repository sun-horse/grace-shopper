const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  finalizedAt: Sequelize.DATE,
  total: Sequelize.INTEGER
})

// Instance method
Order.prototype.returnOrderObject = async function() {
  // Returns an empty array if no products in order
  const products = await this.getProducts().then(
    list => (list ? list.map(product => product.dataValues) : [])
  )

  // console.log(products.order_products)

  return {products, orderId: this.id}
}

module.exports = Order
