/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Cart} from './Cart'
import {dummyCart} from './testData.js'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Cart component', () => {
  let wrapper
  let itemDivs

  beforeEach(() => {
    wrapper = shallow(<Cart />)
    wrapper.setState(dummyCart)
    itemDivs = wrapper.find('.cart-item')
  })

  xit('renders correct number of items in cart', () => {
    expect(itemDivs).to.have.length(dummyCart.products.length)
  })
})
