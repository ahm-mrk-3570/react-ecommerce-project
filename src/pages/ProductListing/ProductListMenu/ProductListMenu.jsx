import { useRef, useState } from 'react';
import CategoryPLM from '../Components/CategoryPLM';
import ColorPLM from '../Components/ColorPLM';
import SizePLM from '../Components/SizePLM';
import './ProductListMenu.css';

export default function ProductListMenu() {
  const category = useRef(null);
  const price = useRef(null);
  const color = useRef(null);
  const size = useRef(null);
  const svgCategory = useRef(null);
  const svgPrice = useRef(null);
  const svgColor = useRef(null);
  const svgSize = useRef(null);

  const handleCollapse = (which) => {
    switch (which) {
      case "categories":
        if(category.current.style.display === "flex") {
          category.current.style.display = "none";
          svgCategory.current.style.transform = "rotate(-90deg)"
        } else {
          category.current.style.display = "flex";
          svgCategory.current.style.transform = "rotate(0deg)"
        }
        break;
      case "price":
        if(price.current.style.display === "flex") {
          price.current.style.display = "none";
          svgPrice.current.style.transform = "rotate(-90deg)"
        } else {
          price.current.style.display = "flex";
          svgPrice.current.style.transform = "rotate(0deg)"
        }
        break;
      case "color":
        if(color.current.style.display === "flex") {
          color.current.style.display = "none";
          svgColor.current.style.transform = "rotate(-90deg)"
        } else {
          color.current.style.display = "flex";
          svgColor.current.style.transform = "rotate(0deg)"
        }
        break;
      case "size":
        if(size.current.style.display === "flex") {
          size.current.style.display = "none";
          svgSize.current.style.transform = "rotate(-90deg)"
        } else {
          size.current.style.display = "flex";
          svgSize.current.style.transform = "rotate(0deg)"
        }
        break;
    }
  }

  return (
    <div className='product-listing-menu'>
      <div className="product-ctegories-plm">
        <div onClick={() => handleCollapse('categories')}  className="product-plm-title">
          <h2>Product Categories</h2>
          <svg ref={svgCategory} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
          </svg>
        </div>
        <ul ref={category} className='category-selector-plm'>
          <CategoryPLM type="men" title="Men" />
          <CategoryPLM type="women" title="Women" />
          <CategoryPLM type="kids" title="Kids" />
          <CategoryPLM type="bags" title="Bags" />
          <CategoryPLM type="belts" title="Belts" />
          <CategoryPLM type="wallets" title="Wallets" />
          <CategoryPLM type="watches" title="Watches" />
          <CategoryPLM type="accessories" title="Accessories" />
          <CategoryPLM type="winter-wear" title="Winter Wear" />
        </ul>
      </div>
      <div className="filter-by-price-plm">
        <div onClick={() => handleCollapse('price')} className="product-plm-title">
          <h2>Filter By Price</h2>
          <svg ref={svgPrice} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
          </svg>
        </div>
        <div ref={price} className="price-enter">
          <input className='from-price' placeholder='from' type="text" />
          <input className='to-price' placeholder='to' type="text" />
        </div>
      </div>
      <div className="filter-by-color">
        <div onClick={() => handleCollapse('color')} className="product-plm-title">
          <h2>Filter By Color</h2>
          <svg ref={svgColor} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
          </svg>
        </div>
        <ul ref={color} className="color-filter-plm">
          <ColorPLM title='Red' count={10} />
          <ColorPLM title='Blue' count={5} />
          <ColorPLM title='Orange' count={2} />
          <ColorPLM title='Black' count={11} />
          <ColorPLM title='Green' count={7} />
          <ColorPLM title='Yellow' count={1} />
        </ul>
      </div>
      <div className="filter-by-size">
        <div onClick={() => handleCollapse('size')} className="product-plm-title">
          <h2>Filter By Size</h2>
          <svg ref={svgSize} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
          </svg>
        </div>
        <ul ref={size} className="size-filter-plm">
          <SizePLM type='small' title='S' count={10} />
          <SizePLM type='medium' title='M' count={10} />
          <SizePLM type='large' title='L' count={10} />
          <SizePLM type='xlarge' title='XL' count={10} />
          <SizePLM type='xxlarge' title='XXL' count={10} />
          <SizePLM type='xxxlarge' title='XXXL' count={10} />
        </ul>
      </div>
    </div>
  )
}
