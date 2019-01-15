// SingleProduct module
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatPrice, handleCartSubmit} from '../utils'
import {fetchProduct, addToCart, setCart} from '../store'
import ProductActions from './ProductActions'

// define class SingleProduct
export class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.handleCartSubmit = handleCartSubmit
    this.handleCartSubmit = this.handleCartSubmit.bind(this)
  }
  componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    this.props.fetchProduct(productId)
  }

  render() {
    const {product} = this.props
    return !product.id ? (
      <div>Nothing found</div>
    ) : (
      <div className="section product">
        <div className="columns is-multiline is-mobile">
          <div className="column card-image is-one-third">
            <figure className="image">
              <img src={product.imageUrl} />
            </figure>
          </div>
          <div className="column card-content">
            <h4 className="title is-3">{product.name}</h4>
            <h5 className="subtitle is-4"> ${formatPrice(product.price)}</h5>
            <p className="desc is-medium">
              {' '}
              {product.description.slice(0, 250)}
              {'...'}
            </p>
            <ProductActions
              product={product}
              handleCartSubmit={this.handleCartSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  product: state.product,
  userId: state.user.id,
  orderId: state.cart.orderId
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  addToCart: (product, userId, orderId) =>
    dispatch(addToCart(product, userId, orderId)),
  setCart: userId => dispatch(setCart(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
