import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import {ProductCard} from '.'

export class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div>
        <h3>All Products</h3>
        {this.props.products.map(product => {
          return <ProductCard key={product.id} {...product} />
        })}
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
