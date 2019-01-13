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

    // update cart object in local storage
    const localCart = JSON.parse(window.localStorage.getItem('cart'))
    const newProducts = [...localCart.products, productToAdd]
    localCart.products = newProducts
    window.localStorage.setItem('cart', JSON.stringify(localCart))
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
          <h5 className="subtitle is-4"> ${formatPrice(product.price)}</h5>

          <form
            method="post"
            onSubmit={this.handleAddToCartSubmit}
            className="level"
          >
            <div className="field cart-item-quantity is-grouped level">
              <label className="label level-item is-marginless">
                Quantity:&nbsp;&nbsp;
              </label>
              <div className="control level-item has-icons-left">
                <span className="select">
                  <select
                    name="quantity"
                    data-product-id={product.id}
                    onChange={handleQuantitySelect}
                    defaultValue={product.quantity}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </span>
                <span className="icon is-small is-left">
                  <i className="fas fa-shopping-cart" />
                </span>
              </div>
              <button
                className="add-to-cart button is-link level-item"
                name="add"
                type="submit"
              >
                Add to Cart
              </button>
            </div>
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
