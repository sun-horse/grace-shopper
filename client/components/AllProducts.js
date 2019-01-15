import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {fetchProducts} from '../store'
import {ProductCard} from '.'

export class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products
    const productsInColumns = _.chunk(products, 2)

    return (
      <div>
        <h3 className="title is-2">All Products</h3>
        <div className="columns">
          {productsInColumns.map((column, i) => {
            return (
              <div className="column" key={i}>
                {column.map(product => {
                  return <ProductCard product={product} key={product.id} />
                })}
              </div>
            )
          })}
        </div>
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
