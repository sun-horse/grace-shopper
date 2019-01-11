/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Navbar} from './Navbar'
import {dummyCart} from './testData'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Navbar', () => {
  let navBar
  const cart = dummyCart

  beforeEach(() => {
    navBar = shallow(<Navbar cart={cart} />)
  })

  it('renders the number of items in the cart', () => {
    expect(navBar.find('#cart-count').text()).to.be.equal('4')
  })
})
