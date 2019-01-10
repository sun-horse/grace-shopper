import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {setCart} from '../store'
import {ProductCard} from '.'
import {formatPrice} from '../utils'

const imageUrl =
  'https://image.spreadshirtmedia.com/image-server/v1/mp/designs/12644108,width=178,height=178/glitter-horse.png'
const dummyCart = {
  products: [
    {name: 'dummy product 1', price: 200, imageUrl},
    {name: 'soothing balm', price: 300, imageUrl}
  ],
  orderId: null
}

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: {
        products: [],
        orderId: null
      }
    }
  }

  componentDidMount() {
    // this.props.setCart()
    this.setState({cart: dummyCart})
  }

  render() {
    console.log('state: ', this.state)
    console.log('props: ', this.props)
    let totalCost = 0
    const products = this.state.cart.products

    if (products) {
      return (
        <div className="cart">
          <h3>Cart</h3>

          {products.map(product => {
            totalCost = totalCost + product.price
            return (
              <div key={product.id} className="cart-item">
                <ProductCard {...product} />
                <div className="cart-item-quantity">Quantity: 1</div>
              </div>
            )
          })}
          <h4>
            Total Cost ({products.length} items): ${formatPrice(totalCost)}
          </h4>
          <button type="button" id="cart-checkout">
            Check Out
          </button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  // setCart: () => dispatch(setCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)