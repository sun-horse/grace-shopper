import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {countTotalItems} from '../utils'

export const Navbar = ({handleClick, isLoggedIn, cart, user}) => {
  const cartQuantity = countTotalItems(cart.products)

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/products" className="navbar-item">
          <img src="/images/logo.png" />
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
              <Link to="#" onClick={handleClick} className="button is-primary">
                Log out
              </Link>
            </div>
          ) : (
            <div className="navbar-item">
              <Link to="/login" className="button is-primary">
                Log In
              </Link>

              <Link to="/signup" className="button is-link">
                <strong>Sign Up</strong>
              </Link>
            </div>
          )}
          <div className="navbar-item">
            <h3 className="subtitle is-5 navbar-message">
              <em>
                Be an empowered SunHorse,{' '}
                {user.email ? `${user.email}` : 'of course'}!
              </em>
            </h3>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <Link to="/cart" className="button is-link" id="cart-button">
              <i className="fas fa-shopping-cart" />
              <p id="cart-count">
                <strong>{cartQuantity}</strong>
              </p>
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
if (process.env.NODE_ENV !== 'test') {
  Navbar.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
  }
}
