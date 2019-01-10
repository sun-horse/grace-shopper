/**
 * IMPORT REQUIRED MODULES
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

/**
 * IMPORT CART REDUCER
 */
import {addItem} from '../store'

/**
 * COMPONENT
 */
export class ProductCard extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(evt) {
    const productToAdd = this.props
    this.props.addItem(productToAdd)
  }
  render() {
    const {name, imageUrl, price} = this.props

    return (
      <div className="product">
        <img src={imageUrl} height="200" width="200" />
        <h4>{name}</h4>
        {/* price is stored in cents, so divide by 100 for dollars */}
        <p>${parseFloat(price / 100.0).toFixed(2)}</p>
        <button name="add" onClick={this.handleClick} type="button">
          + cart
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addItem: product => dispatch(addItem(product))
})
export default withRouter(connect(null, mapDispatchToProps)(ProductCard))

/**
 * PROP TYPES
 */
ProductCard.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number
}
