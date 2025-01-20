import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartItemsCount = cartList.length
      const cartsummaryList = cartList.map(each => each.price * each.quantity)
      const sum = cartsummaryList.reduce(
        (acc, currentValue) => acc + currentValue,
      )
      return (
        <div className="summaryContainer">
          <h1 className="order">
            Order Total: <span className="spanEl">Rs {sum}/-</span>
          </h1>
          <p className="order">{cartItemsCount} items in cart</p>
          <button className="checkOutButton">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
