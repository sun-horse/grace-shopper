/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Navbar} from './Navbar'
import {dummyCart} from './testData'
import {countTotalItems} from '../utils'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Navbar', () => {
  let navBar
  const cart = dummyCart
  const user = {email: 'test@email.com'}

  beforeEach(() => {
    navBar = shallow(<Navbar cart={cart} user={user} />)
  })

  it('counts the correct number of items in the cart', () => {
    expect(Number(navBar.find('#cart-count').text())).to.be.equal(
      countTotalItems(cart.products)
    )
  })
})
