// SingleProduct module
import {Component} from 'react'
import {connect} from 'react-redux'
import {formatPrice} from '../utils'

// define class SingleProduct
export class SingleProduct extends Component {}

const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = dispatch => ({
  // getProduct: dispatch(getProduct(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
