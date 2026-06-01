import Footer from '../../../../components/Footer/Footer';
import Header from '../../../../components/Header/Header';
import MenuProfile from '../../MenuProfile/MenuProfile';
import ProfileHeader from '../../ProfileHeader/ProfileHeader';
import Setting from './Setting/Setting';
import './ProfileSetting.css';

export default function ProfileSetting() {
  return (
    <div className="profile-page">
      <Header />
      <div className='profile-main-page'>
        <div className="profile-section">
          <ProfileHeader />
          <div className="main-profile">
            <MenuProfile />
            <Setting />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
