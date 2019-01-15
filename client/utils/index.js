// price is stored in cents, so divide by 100 for dollars
export const formatPrice = priceInCents => {
  return `${parseFloat(priceInCents / 100.0).toFixed(2)}`
}
export const handleAddToCartSubmit = evt => {
  evt.preventDefault()
  const quantity = Number(evt.target.quantity.value)
  const productToAdd = this.props.product
  productToAdd.quantity = quantity
  this.props.addItem(productToAdd)
}

// sum up product quantities to determine total number of items in cart
export const countTotalItems = products => {
  let total = 0
  products.forEach(product => {
    total += Number(product.quantity)
  })
  return total
}
