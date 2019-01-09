const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderProducts = require('./orderProducts')

Order.belongsTo(User)
User.hasMany(Order)

Order.hasMany(OrderProducts)
OrderProducts.belongsTo(Order)
OrderProducts.belongsTo(User)
OrderProducts.belongsTo(Product)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 *
 */

module.exports = {
  User,
  Product,
  Order,
  OrderProducts
}
