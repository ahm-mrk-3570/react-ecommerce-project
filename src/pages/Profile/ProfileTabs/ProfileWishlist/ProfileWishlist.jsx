import Footer from '../../../../components/Footer/Footer';
import Header from '../../../../components/Header/Header';
import Product from '../../../../components/Product/Product';
import MenuProfile from '../../MenuProfile/MenuProfile';
import ProfileHeader from '../../ProfileHeader/ProfileHeader';
import './ProfileWishlist.css';

export default function ProfileWishlist() {
  return (
    <div className="profile-page">
      <div className='profile-main-page'>
        <div className="profile-section">
          <ProfileHeader />
          <div className="main-profile">
            <MenuProfile />
            <div className="grid-wishlist">
              <Product isWishlist={true} imgLocation="/main-images/products/01.png" title="Printed Dress" description="Printed" beforeDiscount={80} afterDiscount={50} />
              <Product isWishlist={true} imgLocation="/main-images/products/01.png" title="Printed Dress" description="Printed" beforeDiscount={80} afterDiscount={50} />
              <Product isWishlist={true} imgLocation="/main-images/products/01.png" title="Printed Dress" description="Printed" beforeDiscount={80} afterDiscount={50} />
              <Product isWishlist={true} imgLocation="/main-images/products/01.png" title="Printed Dress" description="Printed" beforeDiscount={80} afterDiscount={50} />
              <Product isWishlist={true} imgLocation="/main-images/products/01.png" title="Printed Dress" description="Printed" beforeDiscount={80} afterDiscount={50} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
