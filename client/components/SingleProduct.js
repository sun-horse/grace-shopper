// SingleProduct module
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatPrice} from '../utils'
import {fetchProduct} from '../store'

// define class SingleProduct
export class SingleProduct extends Component {
  componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    this.props.fetchProduct(productId)
  }
  constructor(props) {
    super(props)
    // local state for keeping track of product quantity
    this.state = {
      quantity: Number(this.props.product.quantity) || 1
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
    const {product} = this.props
    return (
      <div className="product">
        <img src={product.imageUrl} height="200" width="200" />
        <h4>{product.name}</h4>
        <p>${formatPrice(product.price)}</p>
        <form method="post" onSubmit={this.handleAddToCartSubmit}>
          <div className="cart-item-quantity">
            Quantity:{' '}
            <select
              name="quantity"
              data-product-id={product.id}
              defaultValue={this.state.quantity}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <button className="add-to-cart" name="add" type="submit">
            + cart
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: productId => dispatch(fetchProduct(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
