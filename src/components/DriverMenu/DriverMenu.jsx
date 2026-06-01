import { useContext, useRef, useState } from 'react';
import './DriverMenu.css';
import GlobalContext from '../../context/Context';
import { Link } from 'react-router-dom';

export default function DriverMenu() {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const listMain = useRef(null);
  const listShop = useRef(null);
  const { isMenuOpen, setIsMenuOpen } = useContext(GlobalContext);

  const closeMenu = () => {
    if(isSubmenuOpen === false) {
      setIsMenuOpen(false);
      document.body.style.overflow = "auto";
    } else {
      setIsSubmenuOpen(false);
    }
  }

  const handleChangeInMenu = () => {
    if(isSubmenuOpen === false) {
      setIsSubmenuOpen(true);
    }
  }

  return (
    <div style={{
      display : isMenuOpen === true ? "flex" : "none",
      opacity : isMenuOpen === true ? "1" : "0"
      }} className='driver-menu-bg'>
      <div className="driver-menu">
        <div className="driver-menu-header">
          <button onClick={closeMenu} className='close-menu'>
            {isSubmenuOpen === false ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={16}>
                <path d="M14.7,11.999L22.934,3.785c.751-.751.751-1.968,0-2.719s-1.968-.751-2.719,0l-8.215,8.234L3.785,1.066c-.751-.751-1.968-.751-2.719,0s-.751,1.968,0,2.719l8.234,8.215L1.066,20.214c-.751.745-.756,1.957-.011,2.708.004.004.007.007.011.011.745.751,1.957.756,2.708.011.004-.004.007-.007.011-.011l8.215-8.234,8.215,8.234c.745.751,1.957.756,2.708.011.004-.004.007-.007.011-.011.751-.745.756-1.957.011-2.708-.004-.004-.007-.007-.011-.011l-8.234-8.215Z" fill="currentColor"/>
              </svg>
            ) : (
              <svg style={{transform : "rotate(180deg)"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={24} fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round">    
                <path d="M15 6l-6 6l6 7"/> 
              </svg>
            )}
          </button>
          <div className='logo-section'>
            <Link to='/'>
              <img src='/logo.svg' />
              <h1 style={{color: 'black'}}>Crimba</h1>
            </Link>
          </div>
        </div>
        <ul ref={listMain} style={{
          display : isSubmenuOpen === true ? "none" : "flex"
        }} className='list-main-menu'>
          <li>
            Home
          </li>
          <li onClick={handleChangeInMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={24} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">    
              <path d="M15 6l-6 6l6 6"/> 
            </svg>
            Shop
          </li>
          <li>
            Our Story
          </li>
          <li>
            Blog
          </li>
          <li>
            Contact Us
          </li>
        </ul>
        <ul ref={listShop} style={{
          display : isSubmenuOpen === true ? "flex" : "none"
        }} className='list-shop-menu'>
          <li>Men Wear</li>
          <li>Women Wear</li>
          <li>Kids Wear</li>
          <li>Bags</li>
          <li>Belts</li>
          <li>Watches</li>
          <li>Accessories</li>
          <li>Winter Wear</li>
        </ul>
        <ul className="bottom-menu-driver">
          <li>
            <button className='search'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </button>
            <input type="text" placeholder='Search...' />
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
            </svg>
            Wishlists
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
            </svg>
            Cart
          </li>
        </ul>
      </div>
    </div>
  )
}
