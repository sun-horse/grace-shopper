import React from 'react'
import PropTypes from 'prop-types'

/**
 * COMPONENT
 */
export const Product = props => {
  const {name, imageUrl, price} = props

  return (
    <div className="product">
      <img src={imageUrl} height="200" width="200" />
      <h4>{name}</h4>
      {/* price is stored in cents, so divide by 100 for dollars */}
      <p>${parseFloat(price / 100.0).toFixed(2)}</p>
    </div>
  )
}

export default Product

/**
 * PROP TYPES
 */
Product.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number
}
