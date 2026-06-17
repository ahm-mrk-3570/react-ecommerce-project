import { useContext } from "react";
import "./PaymentSummery.css";
import GlobalContext from "../../../context/Context";
import CheckoutContext from "../../../context/CheckoutContext";
import AuthContext from "../../../context/AuthContext";
import { addOrderItems, CreateOrder } from "../../../services/orderServices";
import { supabase } from "../../../lib/supabase";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSummery({ buttonText, setShowConfirmed, step }) {
  const { totalPriceDiscount, totalPrice, cartItems, addresses, refreshCart } =
    useContext(GlobalContext);
  const { checkoutData } = useContext(CheckoutContext);
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const address = addresses?.find((a) => a.id === checkoutData.addressId);

  const handlePlaceOrder = async () => {
    if(location.pathname === "/cart") {
      navigate('/checkout');
      return;
    }

    const finallyOrder = {
      user_id: user.id,
      status: "Pending",
      payment_status: "Pending",
      total_price: totalPriceDiscount + 15,
      address_id: address.id,
      shipping_name: address.full_name,
      shipping_address: address.address,
      shipping_city: address.city,
      shipping_country: address.country,
      shipping_state: address.state,
      shipping_postal_code: address.postal_code,
    };

    const { data: orderData, error: orderError } =
      await CreateOrder(finallyOrder);

    const orderItems = cartItems.map((item) => ({
      order_id: orderData?.id,
      product_id: item.products.id,
      product_name: item.products.name,
      product_image: item.products.pictures[0],
      selected_color: item.selected_color,
      selected_size: item.selected_size,
      quantity: item.quantity,
      price:
        item.products.discountprice > 0
          ? item.products.discountprice
          : item.products.price,
    }));

    const { data, error: orderItemsError } = await addOrderItems(orderItems);

    if (orderError || orderItemsError) {console.log(orderError); console.log(orderItemsError); return;}

    const { error: cartError } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    if (cartError) return;

    await refreshCart();

    setShowConfirmed(true);
  };

  return (
    <div className="payment-summery-container">
      <div className="payment-summery">
        <div className="top-section-payment">
          <h1>Order Summery</h1>
          <div className="subtotal-price">
            <span>Subtotal</span>
            <span>${totalPrice}</span>
          </div>
          <div className="discount-size">
            <span>Discount</span>
            <span>-${totalPrice - totalPriceDiscount}</span>
          </div>
          <div className="delivery-fee">
            <span>Delivery Fee</span>
            <span>$15</span>
          </div>
        </div>
        <div className="bottom-section-payment">
          <div className="total-finally">
            <span>Total</span>
            <span>${totalPriceDiscount + 15}</span>
          </div>
          <div className="promo-code">
            <div className="enter-promo-code">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox="0 0 24 24"
              >
                <path d="M10.839,1.003l11.747,11.747-9.836,9.836L1.002,10.837V1.003h9.837M11.25,0l-.003.003H.002v11.245l-.002.002,12.75,12.75,11.25-11.25L11.25,0h0Z" />
                <rect x="2.315" y="2.315" width="3.505" height="3.505" />
              </svg>
              <input type="text" placeholder="Add promo code" />
            </div>
            <div className="apply-promo-code">Apply</div>
          </div>
          <button disabled={location.pathname === "/checkout" && step !== 3} className="go-to-checkout" onClick={handlePlaceOrder}>
            {buttonText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
