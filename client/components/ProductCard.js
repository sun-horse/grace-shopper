/**
 * IMPORT REQUIRED MODULES
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {formatPrice, handleCartSubmit, handleDelete} from '../utils'
import ProductActions from './ProductActions'

/**
 * IMPORT ADD TO CART THUNK
 */
import {addToCart, setCart, removeFromCart} from '../store'

/**
 * COMPONENT
 */
export class ProductCard extends Component {
  constructor(props) {
    super(props)
    this.handleCartSubmit = handleCartSubmit
    this.handleCartSubmit = this.handleCartSubmit.bind(this)
    this.handleDelete = handleDelete
    this.handleDelete = this.handleDelete.bind(this)
  }

  render() {
    const {product, actionToken} = this.props
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
            handleCartSubmit={this.handleCartSubmit}
            actionToken={actionToken}
            handleDelete={this.handleDelete}
            orderId={this.orderId}
            userId={this.userId}
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
  addToCart: (product, userId, orderId, actionToken) =>
    dispatch(addToCart(product, userId, orderId, actionToken)),
  setCart: userId => dispatch(setCart(userId)),
  removeFromCart: (product, orderId, userId) =>
    dispatch(removeFromCart(product, orderId, userId))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)

/**
 * PROP TYPES
 */
ProductCard.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number
}
