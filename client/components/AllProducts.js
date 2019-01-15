import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import {formatProductColumns} from '../utils'

export class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div className="all-products">
        <h3 className="title is-2">All Products</h3>
        {formatProductColumns(products)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
