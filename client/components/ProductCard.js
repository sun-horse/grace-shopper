/**
 * IMPORT REQUIRED MODULES
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {formatPrice} from '../utils'

/**
 * IMPORT CART THUNK
 */
import {addItem} from '../store'

/**
 * COMPONENT
 */
export class ProductCard extends Component {
  constructor(props) {
    super(props)
    // local state for keeping track of product quantity
    this.state = {
      quantity: Number(this.props.product.quantity) || 1
    }
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this)
  }

  handleAddToCartClick() {
    // need to also send product quantity (this.state.quantity) to cart reducer
    const productToAdd = this.props.product
    this.props.addItem(productToAdd)
  }

  render() {
    const {product, handleQuantitySelect} = this.props
    return (
      <div className="product">
        <img src={product.imageUrl} height="200" width="200" />
        <h4>{name}</h4>
        <p>${formatPrice(product.price)}</p>
        <div className="cart-item-quantity">
          Quantity:{' '}
          <select
            name="item-quantity"
            data-product-id={product.id}
            onChange={handleQuantitySelect}
            defaultValue={this.state.quantity}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button
          className="add-to-cart"
          name="add"
          onClick={this.handleAddToCartClick}
          type="button"
        >
          + cart
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addItem: product => dispatch(addItem(product))
})
export default withRouter(connect(null, mapDispatchToProps)(ProductCard))

/**
 * PROP TYPES
 */
ProductCard.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number
}
