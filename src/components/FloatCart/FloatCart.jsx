import { useEffect, useRef } from 'react';
import './FloatCart.css';
import CartFloatItem from './component/CartFloatItem';
import { Link } from 'react-router-dom';

export default function FloatCart({ floatCartRef }) {
  const cartQuantity = useRef(null);
  
  return (
    <div ref={floatCartRef} className='float-cart'>
      <span>You have <span ref={cartQuantity}>3</span> {cartQuantity.current === 1 ? "item" : "items"} in your cart</span>
      <ul className='cart-items-float'>
        <CartFloatItem />
        <CartFloatItem />
        <CartFloatItem />
        <CartFloatItem />
      </ul>
      <div className="subtotal-float">
        <h2>Subtotal</h2>
        <h2>$200.00</h2>
      </div>
      <div className="buttons-float">
        <button className='go-to-cart-float'>
          <Link to="/cart">
            View Cart
          </Link>
        </button>
        <button className='go-to-checkout-float'>
          <Link to="/checkout">
            Checkout
          </Link>
        </button>
      </div>
    </div>
  )
}
