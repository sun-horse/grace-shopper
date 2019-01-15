/**
 * IMPORT REQUIRED MODULES
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {formatPrice} from '../utils'
import ProductActions from './ProductActions'

/**
 * IMPORT ADD TO CART THUNK
 */
import {addToCart, setCart} from '../store'

/**
 * COMPONENT
 */
export class ProductCard extends Component {
  constructor(props) {
    super(props)
    this.handleAddToCartSubmit = this.handleAddToCartSubmit.bind(this)
  }

  async handleAddToCartSubmit(evt) {
    evt.preventDefault()
    const quantity = Number(evt.target.quantity.value)
    const productToAdd = this.props.product
    productToAdd.quantity = quantity
    // if product is already in cart, update quantity on state instead of
    // adding a new item on the front end
    await this.props.addToCart(
      productToAdd,
      this.props.userId,
      this.props.orderId
    )
    this.props.setCart(this.props.userId)
  }

  render() {
    const {product} = this.props
    return (
      <div className="product card">
        <div className="card-image">
          <figure className="image">
            <NavLink to={`/products/${product.id}`}>
              <img src={product.imageUrl} />
            </NavLink>
          </figure>
        </div>
        <div className="card-content">
          <NavLink to={`/products/${product.id}`}>
            <h4 className="title is-3">{product.name}</h4>
          </NavLink>

          <h5 className="subtitle is-4"> ${formatPrice(product.price)}</h5>
          <ProductActions
            product={product}
            handleAddToCartSubmit={this.handleAddToCartSubmit}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  orderId: state.cart.orderId
})

const mapDispatchToProps = dispatch => ({
  addToCart: (product, userId, orderId) =>
    dispatch(addToCart(product, userId, orderId)),
  setCart: userId => dispatch(setCart(userId))
})
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductCard)
)

/**
 * PROP TYPES
 */
ProductCard.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number
}
