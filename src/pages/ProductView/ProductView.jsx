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

  const { wishlists, setCartItems, refreshCart } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);

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

      const finallyData = data.filter((p) => p.id !== product.id);

      setRelatedProducts(finallyData);
    };

    fetchRelatedProducts();
  }, [product]);

  const handleAddToCart = async () => {
    if(!user) {
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
        <div className="main-products-page">
          <AddressBar address="Home > Shop > Product1" />
          <div className="bottom-main-product">
            <ProductDetail
              reviews={reviews}
              product={product}
              selectedPicture={selectedPicture}
              handleAddToCart={handleAddToCart}
              setSelectedDetail={setSelectedDetail}
            />
            <ImageSlider
              product={product}
              selectedPicture={selectedPicture}
              setSelectedPicture={setSelectedPicture}
            />
            <ProductFineInformation
              product={product}
              reviews={reviews}
              setReviews={setReviews}
            />
            <div className="related-products">
              <h2>Related Products</h2>
              <div className="products-related">
                {relatedProducts &&
                  relatedProducts.slice(0, 4).map((p) => {
                    return (
                      <Product
                        key={p.id}
                        id={p.id}
                        imgLocation={p.pictures[0]}
                        title={p.name}
                        description={p.description}
                        hasDiscount={p.discountprice > 0}
                        beforeDiscount={p.discountprice}
                        afterDiscount={p.price}
                        isWishlist={wishlists?.some(
                          (w) => w.product_id === p.id,
                        )}
                        price={p.price}
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
