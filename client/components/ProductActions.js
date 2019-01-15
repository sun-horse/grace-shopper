import React from 'react'

const ProductActions = ({
  product,
  handleCartSubmit,
  actionToken,
  handleDelete
}) => {
  const numOptions = product.inventory < 10 ? product.inventory : 10
  const dropdown = [...Array(numOptions)]
  return (
    <div className="product-actions">
      {numOptions === 0 ? (
        <article className="sold-out message is-danger">
          <div className="message-body">Sold Out!</div>
        </article>
      ) : (
        <form method="post" onSubmit={handleCartSubmit} className="level">
          <div className="field cart-item-quantity is-grouped">
            <div className="control has-icons-left">
              <span className="select is-primary">
                <select
                  name="quantity"
                  data-product-id={product.id}
                  defaultValue={product.quantity}
                >
                  {dropdown.map((x, i) => (
                    <option value={i + 1} key={i}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </span>
              <span className="icon is-small is-left">
                <i className="fas fa-shopping-cart" />
              </span>
            </div>
            <button
              className="add-to-cart button is-primary"
              name="add"
              type="submit"
            >
              {actionToken ? actionToken : 'Add to Cart'}
            </button>
          </div>
          <div className="level">
            {actionToken ? (
              <button
                className="delete level-right"
                onClick={() => handleDelete(product)}
                type="submit"
              />
            ) : (
              ''
            )}
          </div>
        </form>
      )}
    </div>
  )
}

export default ProductActions
