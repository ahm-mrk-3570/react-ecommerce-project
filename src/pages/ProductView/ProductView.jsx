import AddressBar from "../../components/AddressBar";
import Header from "../../components/Header/Header";
import ImageSlider from "./ImageSlider/ImageSlider";
import ProductDetail from "./ProductDetail/ProductDetail";
import ProductFineInformation from "./ProductFineInformation/ProductFineInformation";
import Product from "../../components/Product/Product";
import Features from "../../components/Features/Features";
import "./ProductView.css";
import Footer from "../../components/Footer/Footer";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProduct } from "../../services/productServices";
import { supabase } from "../../lib/supabase";
import GlobalContext from "../../context/Context";
import { getProductReviews } from "../../services/reviewServices";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import { addToCart } from "../../services/cartServices";
import { addToWishlists, removeWishlist } from "../../services/favoriteServices";

export default function ProductView() {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState({
    selected_color: "",
    selected_size: "",
  });

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { wishlists, setCartItems, refreshCart, setWishlists } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);

  const handleAddToWishlists = async (id) => {
    const { data, error } = await addToWishlists({
      product_id: id,
      user_id: user.id,
    });

    console.log(data);

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

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await getProduct(id);
      if (error) return;

      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const fetchReviews = async () => {
      const { data, error } = await getProductReviews(product.id);

      if (error) return;

      setReviews(data);
    };

    fetchReviews();
  }, [product]);

  useEffect(() => {
    if (!product) return;

    const fetchRelatedProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", product.category);

      if (error) return;

      const finallyData = data.filter((p) => p.id !== product.id && p.count !== 0);

      setRelatedProducts(finallyData);
    };

    fetchRelatedProducts();
  }, [product]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please Login first.");
      return;
    }
    if (selectedDetail.selected_size === "") {
      toast.error("Please Select Size...");
      return;
    }

    if (selectedDetail.selected_color === "") {
      toast.error("Please Select Color...");
      return;
    }

    const cartItem = {
      user_id: user?.id,
      product_id: id,
      quantity: 1,
      selected_size: selectedDetail.selected_size,
      selected_color: selectedDetail.selected_color,
    };

    const { data, error } = await addToCart(cartItem);

    if (error) return;

    await refreshCart();

    setCartItems((prev) => [...prev, data]);
    toast.success("Cart Added");
  };

  return (
    <>
      <title>Product</title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="main-products-page container-custom">
          <AddressBar address={`Home > Shop > Product > ${id}`} />
          <div className="bottom-main-product">
            <ProductDetail
              reviews={reviews}
              product={product}
              selectedPicture={selectedPicture}
              handleAddToCart={handleAddToCart}
              setSelectedDetail={setSelectedDetail}
              selectedDetail={selectedDetail}
              setSelectedPicture={setSelectedPicture}
            />
            <ProductFineInformation
              product={product}
              reviews={reviews}
              setReviews={setReviews}
            />
            <div className="related-products">
              <h4>Related Products</h4>
              <div className="products-related">
                {relatedProducts &&
                  relatedProducts.slice(0, 4).map((product) => {
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
              </div>
            </div>
            <Features />
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
