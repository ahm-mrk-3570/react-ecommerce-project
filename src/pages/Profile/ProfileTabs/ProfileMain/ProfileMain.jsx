import ProfileHeader from '../../ProfileHeader/ProfileHeader';
import MenuProfile from '../../MenuProfile/MenuProfile';
import Header from '../../../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';
import './ProfileMain.css';
import ProfileMainDetail from './ProfileMainDetail/ProfileMainDetail';

export default function ProfileMain() {
  return (
    <>
      <div className="profile-page">
        <div className='profile-main-page'>
          <div className="profile-section">
            <ProfileHeader filterShow={false} />
            <div className="main-profile">
              <MenuProfile />
              <ProfileMainDetail />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
