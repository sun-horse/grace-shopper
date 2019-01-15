import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ProductCard} from '.'
import {formatPrice, countTotalItems} from '../utils'

export class Cart extends Component {
  render() {
    let totalCost = 0
    const products = this.props.cart.products
    const cartQuantity = countTotalItems(products)

    if (products) {
      return (
        <div className="cart">
          <h3 className="title is-2">Cart</h3>

          <div className="columns">
            {products.map(product => {
              totalCost += product.price * product.quantity
              return (
                <div key={product.id} className="cart-item column">
                  <ProductCard key={product.id} product={product} />
                </div>
              )
            })}
          </div>
          <footer className="level footer">
            <div className="level-left" />
            <div className="level-right">
              <div className="level-item cart-total">
                <h4 className="subtitle is-3 is-spaced">
                  <i className="fas fa-calculator" />
                  Total Cost ({cartQuantity} items):
                  {cartQuantity === 1 ? ' item' : ' items'}):
                </h4>
                <h5 className="title is-3">${formatPrice(totalCost)}</h5>
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

export default connect(mapStateToProps)(Cart)
