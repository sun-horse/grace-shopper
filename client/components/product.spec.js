/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Product} from './product'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Product component', () => {
  let wrapper
  const product = {name: 'Fake glitter', price: 100}

  beforeEach(() => {
    wrapper = shallow(<Product {...product} />)
  })

  it('renders the product name in an h4', () => {
    expect(wrapper.find('h4').text()).to.be.equal('Fake glitter')
  })
  it('renders add to cart button for each product', () => {
    expect(wrapper.find('button').text()).to.be.equal('+ cart')
  })
})
