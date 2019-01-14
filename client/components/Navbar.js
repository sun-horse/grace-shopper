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
          <img src="logo.png" height="40" />
        </a>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
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
            <Link to="/cart">
              <button type="button">
                <i className="fas fa-shopping-cart" />
                <p id="cart-count">{totalProducts}</p>
              </button>
            </Link>
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
