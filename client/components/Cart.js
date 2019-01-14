import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ProductCard} from '.'
import {formatPrice} from '../utils'
import {dummyCart} from './testData.js'
import {setCart} from '../store'

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleQuantitySelect = this.handleQuantitySelect.bind(this)
  }

  componentDidMount() {
    this.props.setCart(this.props.user.id)
  }

  handleQuantitySelect(evt) {
    const newQuantity = Number(evt.target.value)

    // determine current product on which to change the quantity key
    const productId = Number(evt.target.getAttribute('data-product-id'))

    // don't mutate existing products array on state
    const products = this.state.cart.products
    const newProducts = [...products]

    // find the product whose quantity we want to change
    newProducts.forEach(p => {
      if (p.id === productId) {
        p.quantity = newQuantity
      }
    })
  }

  render() {
    let totalCost = 0
    let totalItems = 0
    const products = this.props.cart.products

    if (products) {
      return (
        <div className="cart">
          <h3 className="title is-2">Cart</h3>

          <div className="columns">
            {products.map(product => {
              totalCost += product.price * product.quantity
              totalItems += product.quantity
              return (
                <div key={product.id} className="cart-item column">
                  <ProductCard
                    key={product.id}
                    product={product}
                    handleQuantitySelect={this.handleQuantitySelect}
                  />
                </div>
              )
            })}
          </div>
          <footer className="level footer">
            <div className="level-left" />
            <div className="level-right">
              <div className="level-item">
                <h4 className="subtitle is-3 is-spaced">
                  Total Cost ({totalItems} items):
                </h4>
                <h5 className="title is-3">
                  &nbsp;&nbsp;${formatPrice(totalCost)}
                </h5>
              </div>
              <div className="level-item has-text-right">
                <button
                  type="button"
                  id="cart-checkout"
                  className="button is-primary is-large"
                >
                  Check Out
                </button>
              </div>
            </div>
          </footer>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  setCart: userId => dispatch(setCart(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
