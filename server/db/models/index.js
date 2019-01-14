const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderProduct = require('./orderProduct')

Order.belongsTo(User)
User.hasMany(Order)

//CG: Changed to not use string literal instead of model instance.
Product.belongsToMany(Order, {through: OrderProduct})
Order.belongsToMany(Product, {through: OrderProduct})

module.exports = {
  User,
  Product,
  Order,
  OrderProduct
}
