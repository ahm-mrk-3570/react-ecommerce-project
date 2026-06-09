import Footer from '../../../../components/Footer/Footer';
import Header from '../../../../components/Header/Header';
import MenuProfile from '../../MenuProfile/MenuProfile';
import ProfileHeader from '../../ProfileHeader/ProfileHeader';
import OrdersList from './OrdersList/OrdersList';
import './ProfileOrder.css';

export default function ProfileOrder() {
  return (
    <div className="profile-page">
      <div className='profile-main-page'>
        <div className="profile-section">
          <ProfileHeader filterShow={true} />
          <div className="main-profile">
            <MenuProfile />
            <OrdersList />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
