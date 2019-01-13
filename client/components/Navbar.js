import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export const Navbar = ({handleClick, isLoggedIn, cart}) => {
  let totalProducts = 0

  const storeCart = cart
  let localCart = {products: []}

  // tests don't have access to global window object
  if (process.env.NODE_ENV !== 'test') {
    localCart = JSON.parse(window.localStorage.getItem('cart'))
  }

  // use cart from the store if user is logged in or we're running a test
  const cartToUse =
    isLoggedIn || process.env.NODE_ENV === 'test' ? storeCart : localCart
  cartToUse.products.forEach(product => {
    totalProducts += Number(product.quantity)
  })
  totalProducts = totalProducts.toString()

  return (
    <div>
      <h1 className="title is-2">
        <Link to="/products">Sun Horse</Link>
      </h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <Link to="/cart">
          <button type="button">
            <i className="fas fa-shopping-cart" />
            <p id="cart-count">{totalProducts}</p>
          </button>
        </Link>
      </nav>
      <hr />
    </div>
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
