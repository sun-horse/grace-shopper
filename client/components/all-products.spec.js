/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './all-products'
import {Product} from './product'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProducts component', () => {
  let wrapper
  let productDivs
  const products = [
    {
      id: 1,
      name: 'Fake glitter',
      price: 1
    }
  ]

  beforeEach(() => {
    wrapper = shallow(<AllProducts products={products} />, {
      disableLifecycleMethods: true
    })
    console.log(wrapper.debug())
    productDivs = wrapper.find(Product)
    // console.dir(productDivs)
  })

  it('renders DIVs with names of each product', () => {
    expect(productDivs).to.have.length(products.length)

    products.forEach(product => {
      const matchingDiv = productDivs.filterWhere(div =>
        div.html().includes(product.name)
      )
      expect(matchingDiv.exists()).to.equal(true)
    })
  })
})
