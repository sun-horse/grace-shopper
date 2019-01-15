// SingleProduct module
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatPrice} from '../utils'
import {fetchProduct, addItem} from '../store'

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

            <form
              method="post"
              onSubmit={this.handleAddToCartSubmit}
              className="level"
            >
              <div className="field cart-item-quantity is-grouped">
                <div className="control has-icons-left">
                  <span className="select">
                    <select
                      name="quantity"
                      data-product-id={product.id}
                      defaultValue={this.state.quantity}
                    >
                      <option value={0}>Quantity</option>
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
                  className="add-to-cart button is-link"
                  name="add"
                  type="submit"
                >
                  Add to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  addItem: product => dispatch(addItem(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
