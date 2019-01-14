import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, setCart} from '../store'
import {ProductCard} from '.'

export class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  componentDidUpdate(prevProps) {
    // Did we just log in or out?
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      this.props.setCart(this.props.user.id)
    }
  }

  render() {
    return (
      <div>
        <h3 className="title is-2">All Products</h3>
        <div className="columns">
          {this.props.products.map((product, i) => {
            return (
              <div className="column" key={product.id}>
                <ProductCard product={product} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  isLoggedIn: !!state.user.id,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  setCart: userId => dispatch(setCart(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
