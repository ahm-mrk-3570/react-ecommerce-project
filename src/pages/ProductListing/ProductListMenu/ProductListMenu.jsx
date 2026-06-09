import CategoryPLM from "../Components/CategoryPLM";
import ColorPLM from "../Components/ColorPLM";
import SizePLM from "../Components/SizePLM";
import "./ProductListMenu.css";
import GlobalContext from "../../../context/Context";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as _ from 'lodash';
import categoryData from "../../../constants/CategoryData";


export default function ProductListMenu() {
  /* Context */
  const { loading, setLoading, products } = useContext(GlobalContext);
  /* Context */

  /* States */
  const [filterOpen, setFilterOpen] = useState(0);
  /* States */

  /* Search Params */
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  /* Search Params */

  /* Navigation */
  const navigate = useNavigate();
  /* Navigation */

  /* Use Ref */
  const fromPrice = useRef(null);
  const toPrice = useRef(null);
  /* Use Ref */

  /* Effects */
  useEffect(() => {
    if(category) {
      setFilterOpen(4);
    } else {
      setFilterOpen(0);
    }
  }, [category])
  /* Effects */

  const handleSubmitPrice = () => {
    setLoading(true);
    if(_.isEmpty(fromPrice.current.value) || _.isEmpty(fromPrice.current.value)) {
      navigate('/products');
    } else {
      setSearchParams(prev => {
        const params = new URLSearchParams(prev);

        params.set("minPrice", fromPrice.current.value);
        params.set("maxPrice", toPrice.current.value);

        return params;
      })
    }

    setLoading(false);
  };

  return (
    <div className="product-listing-menu">
      <div style={{ height: filterOpen === 4 ? "auto" : "45px", transition: "height 0.5s ease-in"}} className="product-ctegories-plm">
        <div className="product-plm-title" onClick={() => setFilterOpen(4)}>
          <h2>Product Categories</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-down"
            viewBox="0 0 16 16"
            style={{ rotate: filterOpen === 4 && "-90deg" }}
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            ></path>
          </svg>
        </div>
        <ul className="category-selector-plm">
          {categoryData.map((c) => {
            return (
              <CategoryPLM
                title={c.title}
                type={c.title}
                key={c.title}
                url={c.url}
                filterOpen={filterOpen}
              />
            );
          })}
        </ul>
      </div>
      <div style={{ height: filterOpen === 1 ? "auto" : "45px", transition: "height 0.5s ease-in", paddingInline: "0"}} className="filter-by-price-plm">
        <div className="product-plm-title" onClick={() => setFilterOpen(1)}>
          <h2>Filter By Price</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-down"
            viewBox="0 0 16 16"
            style={{ rotate: filterOpen === 1 && "-90deg" }}
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            ></path>
          </svg>
        </div>
        <div className="price-enter" style={{ display: filterOpen === 1 ? "flex" : "none"}}>
          <input
            ref={fromPrice}
            className="from-price"
            placeholder="from"
            type="text"
            placeholder={minPrice || "from"}
          />
          <input
            ref={toPrice}
            className="to-price"
            type="text"
            placeholder={maxPrice || "to"}
          />
        </div>
        <button
          disabled={loading === true}
          onClick={handleSubmitPrice}
          className="submit-price-filter"
          style={{ display: filterOpen === 1 ? "block" : "none"}}
        >
          Submit
        </button>
      </div>
      <div style={{ height: filterOpen === 2 ? "auto" : "45px", transition: "height 0.5s ease-in"}} className="filter-by-color">
        <div className="product-plm-title" onClick={() => setFilterOpen(2)}>
          <h2>Filter By Color</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-down"
            viewBox="0 0 16 16"
            style={{ rotate: filterOpen === 3 && "-90deg" }}
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            ></path>
          </svg>
        </div>
        <ul className="color-filter-plm">
          <ColorPLM title="Red" count={products?.filter(p => p.colors.includes("Red")).length || 0} filterOpen={filterOpen} />
          <ColorPLM title="Blue" count={products?.filter(p => p.colors.includes("Blue")).length || 0} filterOpen={filterOpen} />
          <ColorPLM title="Orange" count={products?.filter(p => p.colors.includes("Orange")).length || 0} filterOpen={filterOpen} />
          <ColorPLM title="Black" count={products?.filter(p => p.colors.includes("Black")).length || 0} filterOpen={filterOpen} />
          <ColorPLM title="Green" count={products?.filter(p => p.colors.includes("Green")).length || 0} filterOpen={filterOpen} />
          <ColorPLM title="Yellow" count={products?.filter(p => p.colors.includes("Yellow")).length || 0} filterOpen={filterOpen} />
        </ul>
      </div>
      <div style={{ height: filterOpen === 3 ? "auto" : "45px", transition: "height 0.5s ease-in"}} className="filter-by-size">
        <div className="product-plm-title" onClick={() => setFilterOpen(3)}>
          <h2>Filter By Size</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-down"
            viewBox="0 0 16 16"
            style={{ rotate: filterOpen === 3 && "-90deg" }}
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            ></path>
          </svg>
        </div>
        <ul className="size-filter-plm">
          <SizePLM type="small" title="S" count={products?.filter(p => p.size.includes("S")).length || 0} filterOpen={filterOpen} />
          <SizePLM type="medium" title="M" count={products?.filter(p => p.size.includes("M")).length || 0} filterOpen={filterOpen} />
          <SizePLM type="large" title="L" count={products?.filter(p => p.size.includes("L")).length || 0} filterOpen={filterOpen} />
          <SizePLM type="xlarge" title="XL" count={products?.filter(p => p.size.includes("XL")).length || 0} filterOpen={filterOpen} />
          <SizePLM type="xxlarge" title="XXL" count={products?.filter(p => p.size.includes("XXL")).length || 0} filterOpen={filterOpen} />
          <SizePLM type="xxxlarge" title="XXXL" count={products?.filter(p => p.size.includes("XXXL")).length || 0} filterOpen={filterOpen} />
        </ul>
      </div>
    </div>
  );
}
