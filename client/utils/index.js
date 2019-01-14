// price is stored in cents, so divide by 100 for dollars
export const formatPrice = priceInCents => {
  return `${parseFloat(priceInCents / 100.0).toFixed(2)}`
}
