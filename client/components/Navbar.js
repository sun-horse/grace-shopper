import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export const Navbar = ({handleClick, isLoggedIn, cart, user}) => {
  let totalProducts = 0

  cart.products.forEach(product => {
    totalProducts += Number(product.quantity)
  })
  totalProducts = totalProducts.toString()

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/products" className="navbar-item">
          <img src="logo.png" height="50" />
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/products" className="navbar-item">
            Shop
          </Link>

          {isLoggedIn ? (
            <div className="navbar-item">
              {/* The navbar will show these links after you log in */}
              <Link to="#" onClick={handleClick} className="button is-light">
                Log out
              </Link>
            </div>
          ) : (
            <div className="navbar-item">
              <Link to="/login" className="button is-light">
                Log in
              </Link>

              <Link to="/signup" className="button is-primary">
                <strong>Sign up</strong>
              </Link>
            </div>
          )}
          <div className="navbar-item">
            <h3 className="subtitle is-4 has-text-info">
              Be empowered {user.email ? user.email : 'SunHorse'}!
            </h3>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <Link to="/cart" className="button is-primary">
              <i className="fas fa-shopping-cart" />
              <p>&nbsp;</p>
              <p id="cart-count">{totalProducts}</p>
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
    user: state.user,
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
