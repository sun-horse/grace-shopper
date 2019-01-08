import React from 'react'
import PropTypes from 'prop-types'

/**
 * COMPONENT
 */
const Product = props => {
  const {name, imageUrl, price} = props

  return (
    <h4>
      <img src={imageUrl} height="200" width="200" />
      <div id="name">{name}</div>
      <p>${parseFloat(price).toFixed(2)}</p>
    </h4>
  )
}

export default Product

/**
 * PROP TYPES
 */
Product.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  // sequelize returns DECIMAL fields as strings for some reason...
  price: PropTypes.string
}
