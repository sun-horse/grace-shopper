const Sequelize = require('sequelize')
const db = require('../db')
const DEFAULT_IMAGE_URL =
  'https://image.spreadshirtmedia.com/image-server/v1/mp/designs/12644108,width=178,height=178/glitter-horse.png'

const Product = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: DEFAULT_IMAGE_URL
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Product
