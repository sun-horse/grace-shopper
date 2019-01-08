/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Product from './product'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Product component', () => {
  let wrapper
  const fakeProductData = {name: 'Fake glitter', price: 1}

  beforeEach(() => {
    wrapper = shallow(<Product {...fakeProductData} />)
  })

  it('renders the product name in an h4', () => {
    expect(wrapper.find('h4').text()).to.be.equal('Fake glitter')
  })
})
