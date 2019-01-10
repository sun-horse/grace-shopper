import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {setCart} from '../store'

import {ProductCard} from '.'

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

    if (this.state.cart) {
      return (
        <div className="cart">
          <h3>Cart</h3>

          {this.state.cart.products.map(product => {
            return <ProductCard key={product.id} {...product} />
          })}
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
