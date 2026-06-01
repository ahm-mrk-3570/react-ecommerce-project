import Footer from '../../../../components/Footer/Footer';
import Header from '../../../../components/Header/Header';
import MenuProfile from '../../MenuProfile/MenuProfile';
import ProfileHeader from '../../ProfileHeader/ProfileHeader';
import './ProfileNotifications.css';

export default function ProfileNotifications() {
  return (
    <div className="profile-page">
      <Header />
      <div className='profile-main-page'>
        <div className="profile-section">
          <ProfileHeader />
          <div className="main-profile">
            <MenuProfile />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
