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
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(evt) {
    const productToAdd = this.props
    this.props.addItem(productToAdd)
  }
  render() {
    const {name, imageUrl, price, quantity, handleQuantitySelect} = this.props

    return (
      <div className="product">
        <img src={imageUrl} height="200" width="200" />
        <h4>{name}</h4>
        <p>${formatPrice(price)}</p>
        <div className="cart-item-quantity">
          Quantity:{' '}
          <select
            name="item-quantity"
            data-product-idx={idx}
            onChange={handleQuantitySelect}
            defaultValue={quantity}
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
          onClick={this.handleClick}
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
