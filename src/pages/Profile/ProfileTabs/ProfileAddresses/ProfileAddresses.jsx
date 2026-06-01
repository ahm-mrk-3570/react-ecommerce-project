import { useRef } from 'react';
import Footer from '../../../../components/Footer/Footer';
import Header from '../../../../components/Header/Header';
import MenuProfile from '../../MenuProfile/MenuProfile';
import ProfileHeader from '../../ProfileHeader/ProfileHeader';
import AddAddress from './AddAddress/AddAddress';
import AddressTab from './AddressTab/AddressTab';
import './ProfileAddresses.css';

export default function ProfileAddresses() {
  const addAddressBg = useRef(null);

  const visibleAddAddress = () => {
    addAddressBg.current.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  const closeConainer = () => {
    addAddressBg.current.style.display = "none";
    document.body.style.overflow = "auto";
  }

  return (
    <div className="profile-page">
      <Header />
      <div className='profile-main-page'>
        <div className="profile-section">
          <ProfileHeader />
          <div className="main-profile">
            <MenuProfile />
            <AddressTab visibleAddAddress={visibleAddAddress} />
          </div>
        </div>
      </div>
      <Footer />
      <AddAddress addAddressBg={addAddressBg} closeConainer={closeConainer} />
    </div>
  )
}
