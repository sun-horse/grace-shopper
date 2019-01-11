const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const OrderProducts = db.define(
  'order-products',
  {
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    pricePerItem: Sequelize.INTEGER
  },
  {
    hooks: {
      afterBulkCreate: function(orderProduct) {
        const orderProductList = orderProduct.map(obj => obj.dataValues)

        console.log('orderProductList', orderProductList)

        orderProductList.forEach(async obj => {
          const product = await Product.findById(obj.productId)
          const productPrice = product.dataValues.price

          await OrderProducts.update(
            {
              pricePerItem: productPrice
            },
            {
              where: {
                orderId: 1
              }
            }
          )
        })
        // console.log(orderProduct)
      }
    }
  }
)

module.exports = OrderProducts
