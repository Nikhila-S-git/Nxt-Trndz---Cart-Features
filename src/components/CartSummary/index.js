import {Component} from 'react'
import Popup from 'reactjs-popup'

import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  state = {isDisabeld: true, isPaymentActive: false, isOrderConfirmed: false}

  onSelectPaymentOption = () => {
    this.setState({isDisabeld: false, isPaymentActive: true})
  }

  confirmOrder = () => {
    this.setState({isOrderConfirmed: true})
  }

  render() {
    const {isDisabeld, isPaymentActive, isOrderConfirmed} = this.state
    const paymentClass = isPaymentActive ? 'selectedOptionBtn' : ''
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const cartItemsCount = cartList.length
          const cartsummaryList = cartList.map(
            each => each.price * each.quantity,
          )
          const sum = cartsummaryList.reduce(
            (acc, currentValue) => acc + currentValue,
          )
          return (
            <div className="summaryContainer">
              <h1 className="order">
                Order Total: <span className="spanEl">Rs {sum}/-</span>
              </h1>
              <p className="order">{cartItemsCount} items in cart</p>
              <Popup
                modal
                trigger={<button className="triggerBtn">Checkout</button>}
              >
                {close => (
                  <div className="popupContent">
                    {isOrderConfirmed ? (
                      <div className="orderSuccessfulContainer">
                        <h1>Your order has been placed successfully</h1>
                        <button
                          onClick={() => close()}
                          type="button"
                          className="triggerBtn"
                        >
                          close
                        </button>
                      </div>
                    ) : (
                      <>
                        <h1>Order Total: Rs {sum}/-</h1>
                        <p>{cartItemsCount} items in cart</p>
                        <ul className="paymentOptionContainer">
                          <li>
                            <button
                              className="paymentOptionBtn"
                              disabled
                              type="button"
                            >
                              Card
                            </button>
                          </li>
                          <li>
                            <button
                              className="paymentOptionBtn"
                              disabled
                              type="button"
                            >
                              Net Banking
                            </button>
                          </li>
                          <li>
                            <button
                              className="paymentOptionBtn"
                              disabled
                              type="button"
                            >
                              UPI
                            </button>
                          </li>
                          <li>
                            <button
                              className="paymentOptionBtn"
                              disabled
                              type="button"
                            >
                              Wallet
                            </button>
                          </li>
                          <li>
                            <button
                              className={`paymentOptionBtn ${paymentClass}`}
                              onClick={this.onSelectPaymentOption}
                              type="button"
                            >
                              Cash On Delivery
                            </button>
                          </li>
                        </ul>
                        <div className="popupButtonsContainer">
                          <button
                            type="button"
                            className={`triggerBtn ${paymentClass}`}
                            disabled={isDisabeld}
                            onClick={() => this.confirmOrder(close)}
                          >
                            Confirm Order
                          </button>
                          <button
                            onClick={() => close()}
                            type="button"
                            className="triggerBtn"
                          >
                            close
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
