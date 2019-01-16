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
    let response = await axios.post('/charge', {
      stripToken: token,
      total: this.props.total
    })

    this.props.handleCheckout(ev)
  }

  render() {
    return (
      <div className="checkout">
        <p>
          <em>Please enter your payment information:</em>
        </p>

        <CardElement />

        <button
          type="button"
          className="button is-primary"
          onClick={this.submit}
        >
          Submit
        </button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
