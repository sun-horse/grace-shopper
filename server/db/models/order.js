const Sequelize = require('sequelize')
const db = require('../db')
const OrderProducts = require('./orderProducts')
const Products = require('./product')

const Order = db.define('orders', {
  isActive: Sequelize.BOOLEAN,
  finalizedAt: Sequelize.DATE
})

// Instance method
// Order.prototype.getTotal = async function() {
//   const orderList = await OrderProducts.findAll({
//     where: {
//       orderId: this.id
//     }
//   })

//   const orderProducts = orderList.map(obj => obj.dataValues)
//   console.log(orderProducts)

//   let total = 0;
//   await orderProducts.forEach(async productInfo => {
//     const productDetails = await Products.findById(productInfo.productId)
//     return productInfo.quantity * productDetails.price
//   })

//   return prices
// }

module.exports = Order
