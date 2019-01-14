const Sequelize = require('sequelize')
const db = require('../db')
const Op = Sequelize.Op
const Product = require('./product')

const OrderProduct = db.define('order-products', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  } //CG: Think about putting a prcie on here at purchase.
})

OrderProduct.getProductsById = async function(orderId) {
  try {
    // const order = await Order.findById(orderId);
    // order.getProducts();
    const orderProducts = await OrderProduct.findAll({
      where: {orderId}
    }).map(obj => obj.dataValues.productId)

    const productList = await Product.findAll({
      where: {
        id: {
          [Op.in]: orderProducts
        }
      }
    })

    const orderProductsObj = {
      products: productList.map(obj => obj.dataValues),
      orderId
    }
    return orderProductsObj
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = OrderProduct
