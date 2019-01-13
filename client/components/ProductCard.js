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
      quantity: 0
    }
    this.handleAddToCartSubmit = this.handleAddToCartSubmit.bind(this)
  }

  handleAddToCartSubmit(evt) {
    evt.preventDefault()
    const quantity = Number(evt.target.quantity.value)
    const productToAdd = this.props.product
    productToAdd.quantity = quantity
    this.props.addItem(productToAdd)
  }

  render() {
    const {product, handleQuantitySelect} = this.props
    return (
      <div className="product card">
        <div className="card-image">
          <figure className="image">
            <img src={product.imageUrl} />
          </figure>
        </div>
        <div className="card-content">
          <h4 className="title is-3">{product.name}</h4>
          <p className="subtitle is-5">Price: ${formatPrice(product.price)}</p>

          <form method="post" onSubmit={this.handleAddToCartSubmit}>
            <div className="field cart-item-quantity cart-footer-item">
              <div className="control">
                <div className="select">
                  <select
                    name="quantity"
                    data-product-id={product.id}
                    onChange={handleQuantitySelect}
                    defaultValue={this.state.quantity}
                  >
                    <option value={0}>Quantity</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              className="add-to-cart cart-footer-item"
              name="add"
              type="submit"
            >
              Add to Cart
            </button>
          </form>
        </div>
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
