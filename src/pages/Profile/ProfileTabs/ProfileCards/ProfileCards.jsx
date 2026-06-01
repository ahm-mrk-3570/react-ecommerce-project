import { useRef } from 'react';
import Footer from '../../../../components/Footer/Footer';
import Header from '../../../../components/Header/Header';
import MenuProfile from '../../MenuProfile/MenuProfile';
import ProfileHeader from '../../ProfileHeader/ProfileHeader';
import AddCard from './AddCard/AddCard';
import Cards from './Cards/Cards';
import './ProfileCards.css';

export default function ProfileCards() {
  const cardContainer = useRef(null);
  
  const openCardContainer = () => {
    cardContainer.current.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  const closeCardContainer = () => {
    cardContainer.current.style.display = "none";
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
            <Cards openCardContainer={openCardContainer} />
          </div>
        </div>
      </div>
      <Footer />
      <AddCard cardContainer={cardContainer} closeCardContainer={closeCardContainer} />
    </div>
  )
}
