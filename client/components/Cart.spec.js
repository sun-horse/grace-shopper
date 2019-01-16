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
    wrapper = shallow(<Cart cart={dummyCart} />)
    itemDivs = wrapper.find('.cart-item')
  })

  it('renders correct number of products in the cart', () => {
    expect(itemDivs).to.have.length(dummyCart.products.length)
  })
})
