/* eslint-disable react-hooks/exhaustive-deps */
import "./ProductListing.css";

import Header from "../../components/Header/Header";
import ProductListMenu from "./ProductListMenu/ProductListMenu";
import ProductsGrid from "./ProductsGrid/ProductsGrid";
import Footer from "../../components/Footer/Footer";
import AddressBar from "../../components/AddressBar";
import ProductsPageListing from "./ProductsPageListing/ProductsPageListing";

import GlobalContext from "../../context/Context";
import { useContext, useEffect } from "react";
import { getProducts } from "../../services/productServices";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

export default function ProductListing() {
  /* Context */
  const { setLoading, setProducts, setTotalPages, page } =
    useContext(GlobalContext);
  /* Context */

  /* SearchParams */
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const size = searchParams.get("size");
  const color = searchParams.get("colors");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  /* SearchParams */

  /* useEffe */
  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, totalPages } = await getProducts({
          category,
          size,
          color,
          page,
          minPrice,
          maxPrice,
        });

        if (!cancelled) {
          setProducts(data);
          setTotalPages(totalPages);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.log(err.message);
          toast.error("Something went wrong....");
          setLoading(false);
        }
      }
    };

    fetchProducts();

    () => {
      cancelled = true;
    };
  }, [page, category, size, color, minPrice, maxPrice]);

  return (
    <>
      <title>All Products</title>
      <div className="main-products-page container-custom">
        <AddressBar address="Shop > All Products" />
        <div className="bottom-main">
          <ProductListMenu />
          <ProductsGrid />
        </div>
      </div>
      <ProductsPageListing />
      <Footer />
    </>
  );
}
