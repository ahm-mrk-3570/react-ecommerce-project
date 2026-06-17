import { useContext } from "react";
import "./FloatCart.css";
import CartFloatItem from "./component/CartFloatItem";
import { Link, useNavigate } from "react-router-dom";

import GlobalContext from "../../context/Context";

export default function FloatCart({ floatCartRef }) {
  const navigate = useNavigate();

  const { cartItems, totalPriceDiscount } = useContext(GlobalContext);

  return (
    <div ref={floatCartRef} className="float-cart">
      <span>
        You have <span>{cartItems?.length}</span>{" "}
        {cartItems?.length === 1 ? "item" : "items"} in your cart
      </span>
      <ul className="cart-items-float">
        {cartItems &&
          cartItems.map((item) => (
            <CartFloatItem
              key={item?.id}
              cartItem={item}
              product={item?.products}
            />
          ))}
      </ul>
      <div className="subtotal-float">
        <h2>Subtotal</h2>
        <h2>${totalPriceDiscount}</h2>
      </div>
      <div className="buttons-float">
        <button onClick={() => navigate("/cart")} className="go-to-cart-float">
          View Cart
        </button>
        <button
          onClick={() => navigate("/checkout")}
          className="go-to-checkout-float"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
