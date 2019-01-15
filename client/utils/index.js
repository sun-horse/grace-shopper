import React from 'react'
import _ from 'lodash'
import ProductCard from '../components/ProductCard'

// price is stored in cents, so divide by 100 for dollars
export const formatPrice = priceInCents => {
  return `${parseFloat(priceInCents / 100.0).toFixed(2)}`
}

// sum up product quantities to determine total number of items in cart
export const countTotalItems = products => {
  let total = 0
  products.forEach(product => {
    total += product.quantity
  })
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

export const formatProductColumns = products => {
  // if there are more than 3 products, chunk into columns
  const productsInColumns =
    products.length > 3
      ? _.chunk(products, 2)
      : products.map(product => [product])
  return (
    <div className="columns">
      {productsInColumns.map((column, i) => {
        return (
          <div className="column" key={i}>
            {column.map(product => {
              return <ProductCard product={product} key={product.id} />
            })}
          </div>
        )
      })}
    </div>
  )
}
