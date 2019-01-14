/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from './SingleProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct component', () => {
  let wrapper
  const product = {name: 'Fake glitter', price: 100, description: 'Test desc'}
  const match = {
    params: {
      productId: 1 //any id you want to set
    }
  }

  beforeEach(() => {
    wrapper = shallow(<SingleProduct match={match} product={product} />, {
      disableLifecycleMethods: true
    })
  })

  xit('renders the product name in an h4', () => {
    expect(wrapper.find('h4').text()).to.be.equal('Fake glitter')
  })
  xit('renders add to cart button for each product', () => {
    expect(wrapper.find('button').text()).to.be.equal('Add to Cart')
  })
})
