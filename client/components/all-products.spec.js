/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './all-products'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProducts', () => {
  let allProducts
  const products = [
    {
      name: 'Fake glitter',
      price: 1
    }
  ]

  beforeEach(() => {
    allProducts = shallow(<AllProducts products={products} />, {
      disableLifecycleMethods: true
    })
  })

  it('renders the product in a name ID', () => {
    expect(allProducts.find('#name').text()).to.be.equal('Fake glitter')
  })
})
