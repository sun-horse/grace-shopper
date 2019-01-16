import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await axios.post('/charge', token.id)

    this.props.handleCheckout(ev)
    if (response.status === 200) console.log('Purchase Complete!')
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button className="button is-primary is-large" onClick={this.submit}>
          Send
        </button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
