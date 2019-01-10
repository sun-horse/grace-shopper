/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Navbar} from './Navbar'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Navbar', () => {
  let navBar
  const cart = [
    {name: 'Fake glitter', price: 100},
    {name: 'Fake flying potion', price: 100}
  ]

  beforeEach(() => {
    navBar = shallow(<Navbar cart={cart} />)
  })

  it('renders the number of items in the cart', () => {
    expect(navBar.find('#cart').text()).to.be.equal('2')
  })
})
