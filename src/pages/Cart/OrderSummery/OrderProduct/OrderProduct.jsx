import "./OrderProduct.css";
import { useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import GlobalContext from "../../../../context/Context";
import { removeFromCart, updateQuantity } from "../../../../services/cartServices";
import { toast } from "react-toastify";
import _ from "lodash";

export default function OrderProduct({ cartItem }) {
  const { user } = useContext(AuthContext);
  const { setCartItems, refreshCart } = useContext(GlobalContext);

  const handleIncrement = _.debounce(async () => {
    await updateQuantity("increment", cartItem, user.id);

    refreshCart();
  }, 500);

  const handleDecrement = _.debounce(async () => {
    const { data, error } = await updateQuantity("decrement", cartItem, user.id);

    if (error) {
      console.log(error.message);
      return;
    }

    if (data.quantity === 0) {
      await handleRemove();
    }

    refreshCart();
  }, 500);

  const handleRemove = async () => {
    const { error } = await removeFromCart(user.id, cartItem.products.id);

    if (error) {
      console.log(error);
      return;
    }

    setCartItems((prev) =>
      prev.filter((item) => item.product_id !== cartItem.products.id),
    );
    toast.success("Item Removed");
  };

  return (
    <div className="cart-product">
      <div className="product-detail-cart">
        <img src={cartItem?.products?.pictures?.[0]} alt="Product-01" />
        <div className="product-name">
          <div className="product-name-detail">
            <h4>{cartItem?.products?.name}</h4>
            <p>
              Size: <span>{cartItem?.selected_size}</span>
            </p>
            <p>
              Color: <span>{cartItem?.selected_color}</span>
            </p>
          </div>
          <div className="price-text">
            <p>${cartItem?.products?.price}</p>
          </div>
        </div>
      </div>
      <div className="controllers">
        <button onClick={() => handleRemove()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="red"
            className="bi bi-trash text-white"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
          </svg>
        </button>
        <div className="count-controller-cart">
          <svg
            onClick={handleDecrement}
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 12H18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>{cartItem?.quantity}</p>
          <svg
            onClick={handleIncrement}
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 6V18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 12H18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
