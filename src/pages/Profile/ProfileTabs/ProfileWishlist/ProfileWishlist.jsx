import { useContext } from "react";
import "./ProfileWishlist.css";
import AuthContext from "../../../../context/AuthContext";
import Product from "../../../../components/Product/Product";
import WishlistsProduct from "../../../../components/WishlistsProduct/WishlistsProduct";
import GlobalContext from "../../../../context/Context";
import { addToWishlists, removeWishlist } from "../../../../services/favoriteServices";
import { toast } from "react-toastify";

export default function ProfileWishlist() {
  const { user } = useContext(AuthContext);
  const { wishlists, setWishlists } = useContext(GlobalContext);

  const handleAddToWishlists = async (id) => {
    console.log("add");
    console.log(id);
    const { data, error } = await addToWishlists({
      product_id: id,
      user_id: user.id,
    });

    if (error) return;

    setWishlists((prev) => [...prev, data]);
    toast.success("Added Successfully");
  };

  const handleRemoveFromWishlists = async (favoritesId) => {
    console.log("remove");
    console.log(favoritesId);
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

  return (
    <div className="grid-wishlist">
      <title>Favorites</title>
      {wishlists &&
        wishlists.map((w) => (
          <Product
            key={w.products.id}
            id={w.products.id}
            imgLocation={w.products.pictures[0]}
            title={w.products.name}
            description={w.products.description}
            hasDiscount={w.products.discountprice > 0}
            beforeDiscount={w.products.discountprice}
            afterDiscount={w.products.price}
            isWishlist={true}
            price={w.products.price}
            isAvailaible={w.products.count > 0}
            handleAddToWishlists={handleAddToWishlists}
            handleRemoveFromWishlists={handleRemoveFromWishlists}
            size={w.products.size}
            colors={w.products.colors}
          />
        ))}
    </div>
  );
}
