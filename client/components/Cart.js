import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  formatPrice,
  countTotalItems,
  sumTotalCost,
  formatProductColumns
} from '../utils'

import {checkoutCart} from '../store'

export class Cart extends Component {
  constructor() {
    super()
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  handleCheckout(evt) {
    evt.preventDefault()
    this.props.checkoutCart(this.props.userId, this.props.cart)
  }

  render() {
    const products = this.props.cart.products
    const cartQuantity = countTotalItems(products)
    const totalCost = sumTotalCost(products)

    if (products) {
      return (
        <div className="section cart">
          <h3 className="title is-2">Cart</h3>
          {formatProductColumns(products, 'Update Cart')}
          <footer className="level footer">
            <div className="level-left" />
            <div className="level-right">
              <div className="level-item cart-total">
                <h4 className="subtitle is-3 is-spaced">
                  <i className="fas fa-calculator" />
                  Total Cost ({cartQuantity}{' '}
                  {cartQuantity === 1 ? ' item' : ' items'}):
                </h4>
                <h5 className="title is-3">${formatPrice(totalCost)}</h5>
              </div>
              <div className="level-item has-text-right">
                <button
                  type="button"
                  id="cart-checkout"
                  className="button is-primary is-large"
                  onClick={this.handleCheckout}
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
  user: state.user,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  checkoutCart: (userId, cart) => dispatch(checkoutCart(userId, cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
