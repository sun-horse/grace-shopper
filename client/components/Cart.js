import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  formatPrice,
  countTotalItems,
  sumTotalCost,
  formatProductColumns
} from '../utils'

import {checkoutCart} from '../store'
import CheckoutForm from './CheckoutForm'
import {Elements} from 'react-stripe-elements'

export class Cart extends Component {
  constructor() {
    super()
    // local state for displaying confirmation message upon successful checkout
    this.state = {
      readyForCheckout: false,
      confirmationMessage: null
    }
    this.handleCheckout = this.handleCheckout.bind(this)
    this.togglePaymentView = this.togglePaymentView.bind(this)
  }

  componentDidMount() {
    this.setState({confirmationMessage: null})
  }

  togglePaymentView(evt) {
    evt.preventDefault()
    this.setState(prevState => {
      return {readyForCheckout: !prevState.readyForCheckout}
    })
  }

  async handleCheckout(evt) {
    await this.props.checkoutCart(this.props.userId, this.props.cart)
    let confirmationMessage = `Thank you for your order`
    if (this.props.userId) {
      confirmationMessage += `, ${this.props.user.email}`
    }
    confirmationMessage += '!'
    this.setState({confirmationMessage})
  }

  render() {
    const products = this.props.cart.products
    const cartQuantity = countTotalItems(products)
    const totalCost = sumTotalCost(products)

    if (products.length > 0) {
      return (
        <Elements>
          <div className="section">
            {/* display confirmation message upon succesful checkout */}
            {this.state.confirmationMessage ? (
              <article className="message is-success">
                <div className="message-body">
                  <p className="subtitle is-4">
                    {this.state.confirmationMessage}
                  </p>
                  <Link to="/products" className="button is-success">
                    Return to the Shop
                  </Link>
                </div>
              </article>
            ) : (
              <div className="cart">
                <h3 className="title is-2">Cart</h3>
                {cartQuantity === 0 ? (
                  <article className="message is-warning">
                    <div className="message-body">
                      <p className="subtitle is-4">
                        Your cart is currently empty.
                      </p>
                      <Link to="/products" className="button is-warning">
                        Go Shopping
                      </Link>
                    </div>
                  </article>
                ) : (
                  <div>
                    {' '}
                    {formatProductColumns(products, 'Update Cart')}
                    <footer className="footer">
                      <div className="level">
                        <div className="level-left" />
                        <div className="level-right">
                          <div className="level-item cart-total">
                            <h4 className="subtitle is-3 is-spaced">
                              <i className="fas fa-calculator" />
                              Total Cost ({cartQuantity}{' '}
                              {cartQuantity === 1 ? ' item' : ' items'}):
                            </h4>
                            <h5 className="title is-3">
                              {formatPrice(totalCost)}
                            </h5>
                          </div>
                          <div className="level-item has-text-right">
                            {this.state.readyForCheckout ? (
                              <div id="stripe-form">
                                <CheckoutForm
                                  handleCheckout={this.handleCheckout}
                                  total={totalCost}
                                />
                              </div>
                            ) : (
                              <button
                                type="button"
                                id="cart-checkout"
                                className="button is-primary is-large"
                                onClick={this.togglePaymentView}
                              >
                                Check Out
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </footer>
                  </div>
                )}
              </div>
            )}
          </div>
        </Elements>
      )
    } else {
      return <div className="section">Loading...</div>
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
