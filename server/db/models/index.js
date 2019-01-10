const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderProducts = require('./orderProducts')

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Order, {through: 'order-products'})
Order.belongsToMany(Product, {through: 'order-products'})

module.exports = {
  User,
  Product,
  Order,
  OrderProducts
}
