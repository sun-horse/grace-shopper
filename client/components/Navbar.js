import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {countTotalItems} from '../utils'

export const Navbar = ({handleClick, isLoggedIn, cart, user}) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/products" className="navbar-item">
          <img src="/images/logo.png" height="50" />
        </Link>
      </div>

      <div className="navbar-menu">
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
            <h3 className="subtitle is-5 has-text-info">
              <em>
                Be an empowered SunHorse{user.email ? `, ${user.email}` : ''}!
              </em>
            </h3>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <Link to="/cart" className="button is-primary" id="cart-button">
              <i className="fas fa-shopping-cart" />
              <p id="cart-count">
                <strong>{countTotalItems(cart.products)}</strong>
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
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
