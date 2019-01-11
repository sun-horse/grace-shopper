const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderProduct = require('./orderProduct')

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Order, {through: 'order-products'})
Order.belongsToMany(Product, {through: 'order-products'})

module.exports = {
  User,
  Product,
  Order,
  OrderProduct
}
