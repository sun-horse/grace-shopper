/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './AllProducts'
import {ProductCard} from './ProductCard'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProducts component', () => {
  let wrapper
  let productDivs
  const products = [
    {
      id: 1,
      name: 'Fake glitter',
      price: 100
    }
  ]

  beforeEach(() => {
    wrapper = shallow(<AllProducts products={products} />, {
      disableLifecycleMethods: true
    })
    productDivs = wrapper.find(ProductCard)
  })

  xit('renders DIVs with names of each product', () => {
    expect(productDivs).to.have.length(products.length)

    products.forEach(product => {
      const matchingDiv = productDivs.filterWhere(div =>
        div.html().includes(product.name)
      )
      expect(matchingDiv.exists()).to.equal(true)
    })
  })
})
