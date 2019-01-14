import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export const Navbar = ({handleClick, isLoggedIn, cart}) => {
  let totalProducts = 0

  cart.products.forEach(product => {
    totalProducts += Number(product.quantity)
  })
  totalProducts = totalProducts.toString()

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/products">
          <img src="logo.png" height="50" />
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" href="/products">
            Shop
          </a>

          {isLoggedIn ? (
            <div className="navbar-item">
              {/* The navbar will show these links after you log in */}
              <a href="#" onClick={handleClick} className="button is-light">
                Log out
              </a>
            </div>
          ) : (
            <div className="navbar-item">
              <a href="/login" className="button is-light">
                Log in
              </a>

              <a href="/signup" className="button is-primary">
                <strong>Sign up</strong>
              </a>
            </div>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <a href="/cart" className="button is-primary">
              <i className="fas fa-shopping-cart" />
              <p id="cart-count">&nbsp;{totalProducts}</p>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
