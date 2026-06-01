import AddressBar from '../../components/AddressBar';
import Header from '../../components/Header/Header';
import ImageSlider from './ImageSlider/ImageSlider';
import ProductDetail from './ProductDetail/ProductDetail';
import ProductFineInformation from './ProductFineInformation/ProductFineInformation';
import Product from '../../components/Product/Product';
import Features from '../../components/Features/Features'
import './ProductView.css';
import Footer from '../../components/Footer/Footer';

export default function ProductView() {
  return (
    <>
    <title>Product</title>
      <Header />
      <div className='main-products-page'>
        <AddressBar address='Home > Shop > Product1' />
        <div className="bottom-main-product">
          <ProductDetail />
          <ImageSlider />
          <ProductFineInformation />
          <div className="related-products">
            <h2>Related Products</h2>
            <div className="products-related">
              <Product imgLocation='main-images/products/01.png' title='Girl dress' description='the beautiful dress for girls' beforeDiscount={100.00} afterDiscount={75.00} />
              <Product imgLocation='main-images/products/01.png' title='Girl dress' description='the beautiful dress for girls' beforeDiscount={100.00} afterDiscount={75.00} />
              <Product imgLocation='main-images/products/01.png' title='Girl dress' description='the beautiful dress for girls' beforeDiscount={100.00} afterDiscount={75.00} />
              <Product imgLocation='main-images/products/01.png' title='Girl dress' description='the beautiful dress for girls' beforeDiscount={100.00} afterDiscount={75.00} />
            </div>
          </div>
          <Features />
          <Footer />
        </div>
      </div>
    </>
  )
}
