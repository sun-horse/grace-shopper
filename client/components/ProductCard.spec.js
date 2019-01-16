/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {ProductCard} from './ProductCard'
import {formatPrice} from '../utils'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('ProductCard component', () => {
  let wrapper
  const product = {name: 'Fake glitter', price: 100, description: 'Test desc'}

  beforeEach(() => {
    wrapper = shallow(<ProductCard product={product} />)
  })

  it('renders the product name in an h4', () => {
    expect(wrapper.find('h4').text()).to.be.equal('Fake glitter')
  })
  it('correctly formats the price', () => {
    expect(wrapper.find('h5').text()).to.be.equal(formatPrice(product.price))
    // expect(Number(wrapper.find('h5').text())).to.be.equal(100)
  })
})
