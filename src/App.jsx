/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from 'react';
import GlobalContext from './context/Context';
import './App.css';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import ForgetPage from './pages/ForgetPage/ForgetPage';
import MainPage from './pages/Main/MainPage';
import ProductListing from './pages/ProductListing/ProductListing';
import ProductView from './pages/ProductView/ProductView';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import ProfileMain from './pages/Profile/ProfileTabs/ProfileMain/ProfileMain';
import ProfileOrder from './pages/Profile/ProfileTabs/ProfileOrder/ProfileOrder';
import ProfileWishlist from './pages/Profile/ProfileTabs/ProfileWishlist/ProfileWishlist';
import ProfileAddresses from './pages/Profile/ProfileTabs/ProfileAddresses/ProfileAddresses';
import ProfileCards from './pages/Profile/ProfileTabs/ProfileCards/ProfileCards';
import ProfileNotifications from './pages/Profile/ProfileTabs/ProfileNotifications/ProfileNotifications';
import ProfileSetting from './pages/Profile/ProfileTabs/ProfileSetting/ProfileSetting';

function App() {
  /* State */
  const [theme, setTheme] = useState(localStorage.getItem('theme'));
  const [logginedUser, setLogginedUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /* State */

  /* Ref */
  const app = useRef(null);
  const menuRef = useRef(null);
  const btnMenuRef = useRef(null);
  /* Ref */

  /* Effect */
  useEffect(() => {
    if(theme === 'light') {
      app.current.classList.remove('body-dark');
      app.current.classList.add('body-light');
      localStorage.setItem('theme', theme);
    } else if(theme === 'dark') {
      app.current.classList.remove('body-light');
      app.current.classList.add('body-dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme])
  /* Effect */

  const toggleTheme = (type) => {
    if(type === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    }
    
    if(type === 'dark') {
      setTheme('light');
    }
    
    if(type === 'light') {
      setTheme('dark');
    }
    setTheme(prev => prev === 'light' ? 'dark' : 'light');  
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";
  }

  return (
    <GlobalContext.Provider value={{toggleTheme, menuRef, btnMenuRef, isMenuOpen, setIsMenuOpen}}>
      <div ref={app} style={{transition: 'ease-in-out 0.3s'}}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/forget' element={<ForgetPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<ProductListing />} />
          <Route path='/product' element={<ProductView />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/profile' element={<ProfileMain />} />
          {/* Profile Tabs */}
          <Route path='/orders' element={<ProfileOrder />} />
          <Route path='/wishlists' element={<ProfileWishlist />} />
          <Route path='/addresses' element={<ProfileAddresses />} />
          <Route path='/cards' element={<ProfileCards />} />
          <Route path='/notifications' element={<ProfileNotifications />} />
          <Route path='/setting' element={<ProfileSetting />} />
          {/* Profile Tabs */}
          <Route path='/' element={<MainPage btnMenuRef={btnMenuRef} menuRef={menuRef} openMenu={openMenu} />} />
        </Routes>
      </div>
    </GlobalContext.Provider>
  )
}

export default App
