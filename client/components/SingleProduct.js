// SingleProduct module
import {Component} from 'react'
import {connect} from 'react-redux'
import {formatPrice} from '../utils'
import {getProduct} from '../store'

// define class SingleProduct
export class SingleProduct extends Component {
  componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    this.props.getProduct(productId)
  }
}

const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = dispatch => ({
  getProduct: productId => dispatch(getProduct(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
