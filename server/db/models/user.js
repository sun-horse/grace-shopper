const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')
const OrderProduct = require('./orderProduct')

const dummyCart = {
  products: [
    {
      id: 1,
      name: 'Mane Glitter',
      price: 200,
      imageUrl: '/images/glitter.jpg',
      quantity: 1
    },
    {
      id: 2,
      name: 'Pegasus Wings',
      price: 300,
      imageUrl: '/images/wings.jpg',
      quantity: 3
    }
  ],
  orderId: 1
}

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.getCart = async function() {
  const activeOrder = await Order.findOne({
    where: {userId: this.id, isActive: true}
  })
  const cart = await OrderProduct.getProductsById(activeOrder.id)
  return cart
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
