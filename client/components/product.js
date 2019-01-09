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
export class Product extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(evt) {
    const productToAdd = this.props
    // this.props.addItem(productToAdd)
  }
  render() {
    console.log('recived this props', this.props)
    const {name, imageUrl, price} = this.props

    return (
      <div className="product">
        <img src={imageUrl} height="200" width="200" />
        <h4>{name}</h4>
        <p>${parseFloat(price).toFixed(2)}</p>
        <button name="add" onClick={this.handleClick} type="button">
          + cart
        </button>
      </div>
    )
  }
}
// export const Product = props => {
//   const {name, imageUrl, price} = props

//   return (
//     <div className="product">
//       <img src={imageUrl} height="200" width="200" />
//       <h4>{name}</h4>
//       <p>${parseFloat(price).toFixed(2)}</p>
//     </div>
//   )
// }

export default Product

/**
 * PROP TYPES
 */
Product.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number
}
