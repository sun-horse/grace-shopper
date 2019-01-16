import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, setCart} from '../store'
import {formatProductColumns} from '../utils'

export class AllProducts extends Component {
  async componentDidMount() {
    await this.props.fetchProducts()
    this.props.setCart(this.props.user.id)
  }

  render() {
    const products = this.props.products
    return (
      <div className="section all-products">
        <h3 className="title is-2">All Products</h3>
        {products.length ? (
          formatProductColumns(products)
        ) : (
          <div>Loading...</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  setCart: userId => dispatch(setCart(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
