import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {setCart} from '../store'
import {ProductCard} from '.'
import {formatPrice} from '../utils'

const imageUrl =
  'https://image.spreadshirtmedia.com/image-server/v1/mp/designs/12644108,width=178,height=178/glitter-horse.png'
const dummyCart = {
  products: [
    {name: 'dummy product 1', price: 200, imageUrl, quantity: 1},
    {name: 'dummy product 2', price: 300, imageUrl, quantity: 1}
  ],
  orderId: 1
}

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleQuantitySelect = this.handleQuantitySelect.bind(this)
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

  handleQuantitySelect(evt) {
    const newQuantity = Number(evt.target.value)
    // determine current product on which to change the quantity key
    const productIdx = evt.target.getAttribute('data-product-idx')
    const products = this.state.cart.products
    const newProducts = [...products]
    newProducts[productIdx].quantity = newQuantity
    this.setState({
      cart: {
        products: newProducts
      }
    })
    console.log('new state: ', this.state)
  }

  render() {
    // console.log('state: ', this.state)
    // console.log('props: ', this.props)
    let totalCost = 0
    let totalItems = 0
    const products = this.state.cart.products

    if (products) {
      return (
        <div className="cart">
          <h3>Cart</h3>

          {products.map((product, idx) => {
            totalCost += product.price * product.quantity
            totalItems += product.quantity
            return (
              <div key={product.id} className="cart-item">
                <ProductCard {...product} />
                <div className="cart-item-quantity">
                  Quantity:{' '}
                  <select
                    name="item-quantity"
                    data-product-idx={idx}
                    onChange={this.handleQuantitySelect}
                    defaultValue={1}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
              </div>
            )
          })}
          <h4>
            Total Cost ({totalItems} items): ${formatPrice(totalCost)}
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
