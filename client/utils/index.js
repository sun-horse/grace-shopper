import React from 'react'
import _ from 'lodash'
import ProductCard from '../components/ProductCard'

// price is stored in cents, so divide by 100 for dollars
export const formatPrice = priceInCents => {
  return `$${parseFloat(priceInCents / 100.0).toFixed(2)}`
}

// sum up product quantities to determine total number of items in cart
export const countTotalItems = products => {
  let total = 0
  if (products) {
    products.forEach(product => {
      total += product.quantity
    })
  }
  return total
}

// calculate total cost of an array of products
export const sumTotalCost = products => {
  let total = 0
  products.forEach(product => {
    total += product.price * product.quantity
  })
  return total
}

export const formatProductColumns = (products, actionToken) => {
  // if there are more than 3 products, chunk them into columns
  const productsInColumns =
    products.length > 3
      ? _.chunk(products, 2)
      : products.map(product => [product])

  return (
    <div className="columns">
      {productsInColumns.map((column, i) => {
        return (
          <div className={'column ' + (actionToken ? 'cart-item' : '')} key={i}>
            {column.map(product => {
              return (
                <ProductCard
                  product={product}
                  key={product.id}
                  actionToken={actionToken}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

// method to add / update cart
export async function handleCartSubmit(evt) {
  evt.preventDefault()
  const {product, userId, orderId, actionToken} = this.props
  const quantity = Number(evt.target.quantity.value)
  product.quantity = quantity
  await this.props.addToCart(product, userId, orderId, actionToken)
  this.props.setCart(userId)
}

export async function handleDelete(product) {
  const {userId, orderId} = this.props
  await this.props.removeFromCart(product, orderId, userId)
  this.props.setCart(userId)
}
