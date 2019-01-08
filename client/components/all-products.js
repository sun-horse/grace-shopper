import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products.js'

export class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div>
        <h3>All Products</h3>
        {this.props.products.map(product => {
          return (
            <h4 key={product.id}>
              <img src={product.imageUrl} height="200" width="200" />
              <div id="name">{product.name}</div>
              <p>${parseFloat(product.price).toFixed(2)}</p>
            </h4>
          )
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
