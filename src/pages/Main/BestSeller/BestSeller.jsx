import "./BestSeller.css";
import Product from "../../../components/Product/Product";
import { useContext } from "react";
import GlobalContext from "../../../context/Context";
import ProductCardSkeleton from "../../../components/loadingComponents/ProductCardSkeleton";

export default function BestSeller() {
  const { loading } = useContext(GlobalContext);

  return (
    <div className="best-seller-container">
      <div className="best-seller-header">Our Bestseller</div>
      <ul className="best-seller-items-container">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : (
          <>
            <Product
              imgLocation={`${import.meta.env.BASE_URL}/main-images/banner-main-images/banner.jpg`}
              title="RoadStar"
              description="Printed Cotton T-shirt"
              beforeDiscount="40.00"
              afterDiscount="38.00"
            />
            <Product
              imgLocation={`${import.meta.env.BASE_URL}/main-images/banner-main-images/banner.jpg`}
              title="RoadStar"
              description="Printed Cotton T-shirt"
              beforeDiscount="40.00"
              afterDiscount="38.00"
            />
            <Product
              imgLocation={`${import.meta.env.BASE_URL}/main-images/banner-main-images/banner.jpg`}
              title="RoadStar"
              description="Printed Cotton T-shirt"
              beforeDiscount="40.00"
              afterDiscount="38.00"
            />
            <Product
              imgLocation={`${import.meta.env.BASE_URL}/main-images/banner-main-images/banner.jpg`}
              title="RoadStar"
              description="Printed Cotton T-shirt"
              beforeDiscount="40.00"
              afterDiscount="38.00"
            />
            <Product
              imgLocation={`${import.meta.env.BASE_URL}/main-images/banner-main-images/banner.jpg`}
              title="RoadStar"
              description="Printed Cotton T-shirt"
              beforeDiscount="40.00"
              afterDiscount="38.00"
            />
            <Product
              imgLocation={`${import.meta.env.BASE_URL}/main-images/banner-main-images/banner.jpg`}
              title="RoadStar"
              description="Printed Cotton T-shirt"
              beforeDiscount="40.00"
              afterDiscount="38.00"
            />
            <Product
              imgLocation={`${import.meta.env.BASE_URL}/main-images/banner-main-images/banner.jpg`}
              title="RoadStar"
              description="Printed Cotton T-shirt"
              beforeDiscount="40.00"
              afterDiscount="38.00"
            />
            <Product
              imgLocation={`${import.meta.env.BASE_URL}/main-images/banner-main-images/banner.jpg`}
              title="RoadStar"
              description="Printed Cotton T-shirt"
              beforeDiscount="40.00"
              afterDiscount="38.00"
            />
          </>
        )}
      </ul>
    </div>
  );
}
