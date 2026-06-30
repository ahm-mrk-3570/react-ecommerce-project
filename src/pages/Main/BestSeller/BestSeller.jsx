import "./BestSeller.css";
import Product from "../../../components/Product/Product";
import { useContext } from "react";
import GlobalContext from "../../../context/Context";
import ProductCardSkeleton from "../../../components/loadingComponents/ProductCardSkeleton";
import { toast } from "react-toastify";
import {
  addToWishlists,
  removeWishlist,
} from "../../../services/favoriteServices";
import { addToCart } from "../../../services/cartServices";
import AuthContext from "../../../context/AuthContext";

export default function BestSeller() {
  const {
    loading,
    bestSellerProducts,
    wishlists,
    setWishlists,
    refreshCart,
    setCartItems,
  } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);

  const handleAddToWishlists = async (id) => {
    if (!user) {
      toast.error("Login first...");
    }
    const { data, error } = await addToWishlists({
      product_id: id,
      user_id: user.id,
    });

    if (error) return;

    setWishlists((prev) => [...prev, data]);
    toast.success("Added Successfully");
  };

  const handleRemoveFromWishlists = async (favoritesId) => {
    const { error } = await removeWishlist(favoritesId);
    if (error) {
      console.log(error.message);
      toast.error("Something went wrong..");
      return;
    }

    setWishlists((prev) =>
      prev.filter((item) => item.product_id !== favoritesId),
    );
    toast.success("Product deleted from your wishlists");
  };

  const handleAddToCart = async (productSize, productColor, productId) => {
    if (!user) {
      toast.error("Please Login first.");
      return;
    }
    if (productSize === "") {
      return;
    }

    if (productColor === "") {
      return;
    }

    const cartItem = {
      user_id: user?.id,
      product_id: productId,
      quantity: 1,
      selected_size: productSize,
      selected_color: productColor,
    };

    const { data, error } = await addToCart(cartItem);

    if (error) return;

    await refreshCart();

    setCartItems((prev) => [...prev, data]);
    toast.success("Cart Added");
  };

  return (
    <div className="best-seller-container container-custom">
      <div className="best-seller-header">Our Bestseller</div>
      <ul className="best-seller-items-container">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : (
          <>
            {bestSellerProducts &&
              bestSellerProducts.map((product) => {
                return (
                  <Product
                    key={product.id}
                    id={product.id}
                    imgLocation={product.pictures[0]}
                    title={product.name}
                    description={product.description}
                    hasDiscount={product.discountprice > 0}
                    beforeDiscount={product.discountprice}
                    afterDiscount={product.price}
                    isWishlist={wishlists?.some(
                      (w) => w.product_id === product.id,
                    )}
                    price={product.price}
                    isAvailaible={product.count > 0}
                    handleAddToWishlists={handleAddToWishlists}
                    handleRemoveFromWishlists={handleRemoveFromWishlists}
                    handleAddToCart={handleAddToCart}
                    size={product.size}
                    colors={product.colors}
                  />
                );
              })}
          </>
        )}
      </ul>
    </div>
  );
}
