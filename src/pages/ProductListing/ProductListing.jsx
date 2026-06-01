import './ProductListing.css';
import Header from '../../components/Header/Header';
import ProductListMenu from './ProductListMenu/ProductListMenu';
import ProductsGrid from './ProductsGrid/ProductsGrid';
import Footer from '../../components/Footer/Footer';
import AddressBar from '../../components/AddressBar';

export default function ProductListing() {
  return (
    <>
      <title>All Products</title>
      <Header />
      <div className='main-products-page'>
        <AddressBar address='Shop > All Products' />
        <div className="bottom-main">
          <ProductListMenu />
          <ProductsGrid />
        </div>
      </div>
      <Footer />
    </>
  )
}
