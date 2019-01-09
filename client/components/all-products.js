import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import {Product} from '../components'

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
            <Product
              key={product.id}
              {...product}
              // sequelize returns decimal fields as strings (?!),
              // so we need to convert price back into a number
              price={parseFloat(product.price)}
            />
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
