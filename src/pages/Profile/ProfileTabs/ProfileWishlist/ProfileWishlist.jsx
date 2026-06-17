import { useContext } from "react";
import "./ProfileWishlist.css";
import AuthContext from "../../../../context/AuthContext";
import Product from "../../../../components/Product/Product";
import WishlistsProduct from "../../../../components/WishlistsProduct/WishlistsProduct";
import GlobalContext from "../../../../context/Context";

export default function ProfileWishlist() {

  const { wishlists, setWishlists } = useContext(GlobalContext);

  return (
    <div className="grid-wishlist">
      {wishlists && wishlists.map((w) => (
        <WishlistsProduct
          id={w.id}
          productId={w.products.id}
          key={w.products.id}
          imgLocation={w.products.pictures[0]}
          title={w.products.name}
          isWishlist={true}
          description={w.products.description}
          setWishlists={setWishlists}
        />
      ))}
    </div>
  );
}
