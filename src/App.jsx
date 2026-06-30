/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";

import "./App.css";

import GlobalContext from "./context/Context";
import AuthContext from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ForgetPage from "./pages/ForgetPage/ForgetPage";
import MainPage from "./pages/Main/MainPage";
import ProductListing from "./pages/ProductListing/ProductListing";
import ProductView from "./pages/ProductView/ProductView";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import ProfileMain from "./pages/Profile/ProfileTabs/ProfileMain/ProfileMain";
import ProfileOrder from "./pages/Profile/ProfileTabs/ProfileOrder/ProfileOrder";
import ProfileWishlist from "./pages/Profile/ProfileTabs/ProfileWishlist/ProfileWishlist";
import ProfileAddresses from "./pages/Profile/ProfileTabs/ProfileAddresses/ProfileAddresses";
import ProfileCards from "./pages/Profile/ProfileTabs/ProfileCards/ProfileCards";
import ProfileNotifications from "./pages/Profile/ProfileTabs/ProfileNotifications/ProfileNotifications";
import ProfileSetting from "./pages/Profile/ProfileTabs/ProfileSetting/ProfileSetting";
import Header from "./components/Header/Header";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "./lib/supabase";
import ProfileLayout from "./layouts/ProfileLayout";
import { getWishlists } from "./services/favoriteServices";
import { getReviews } from "./services/reviewServices";
import { getCart, getTotalPrice } from "./services/cartServices";
import CheckoutContext from "./context/CheckoutContext";
import { getAddresses } from "./services/addressServices";
import { getAllCards } from "./services/cardServices";
import { getProductsBestSeller } from "./services/productServices";
import EnterPassword from "./pages/EnterPassword/EnterPassword";
import { createPortal } from "react-dom";
import DriverMenu from "./components/DriverMenu/DriverMenu";
import {
  getCurrentSession,
  subscribeToAuthChange,
} from "./services/AuthServices";
import { getProfile } from "./services/profileServices";

function App() {
  /* State */
  const [isDriverPortalOpen, setIsDriverPortalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [wishlists, setWishlists] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceDiscount, setTotalPriceDiscount] = useState(0);
  const [loadingUser, setLoadingUser] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("checkout")) || {
        addressId: null,
        cardId: null,
        shippingMethod: null,
      }
    );
  });
  const [themeMode, setThemeMode] = useState(
    () => localStorage.getItem("theme") ?? "system",
  );
  const [systemPreference, setSystemPreference] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );
  /* State */

  const portalEl = useRef(document.querySelector(".portal-driver-menu"));

  const appliedTheme = themeMode === "system" ? systemPreference : themeMode;

  /* Effect */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setSystemPreference(e.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", appliedTheme);
  }, [appliedTheme]);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const session = await getCurrentSession();

        setUser(session?.user ?? null);
        setLoadingUser(false);
      } catch (error) {
        console.log(error.message);
        setLoadingUser(false);
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = subscribeToAuthChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchWishlist = async () => {
      const { data, error } = await getWishlists(user.id);

      if (error) return;

      setWishlists(data);
    };

    fetchWishlist();
  }, [user]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await getReviews();

      if (error) return;

      setReviews(data);
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const { data, error } = await getProfile(user);

        if (error) return;

        if (!data) {
          console.log("No profile found for user:", user.id);
          return;
        }

        setProfile(data);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetch = async () => {
      const { data, error } = await getAddresses(user.id);
      if (error) {
        toast.error("Failed to load addresses");
        return;
      }
      setAddresses(data || []);
    };

    fetch();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchCards = async () => {
      const { data, error } = await getAllCards(user);

      if (error) return;

      setCards(data);
    };

    fetchCards();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    refreshCart();
  }, [user]);

  useEffect(() => {
    const fetchBestSellerProducts = async () => {
      setLoading(true);
      try {
        const { data } = await getProductsBestSeller();
        setBestSellerProducts(data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
        toast.error("Something Went Wrong...");
        setLoading(false);
      }
    };

    fetchBestSellerProducts();
  }, []);

  useEffect(() => {
    if (!portalEl.current) return;
    portalEl.current.style.display = isDriverPortalOpen ? "flex" : "none";
    document.body.style.overflow = isDriverPortalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDriverPortalOpen]);
  /* Effect */

  /* Functions */

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const toggleTheme = (type) => {
    if (type === "system") {
      setThemeMode("system");
    } else if (type === "light") {
      setThemeMode("light");
    } else if (type === "dark") {
      setThemeMode("dark");
    }
  };

  const refreshCart = async () => {
    if (!user) return;

    const { data: cartItems, error: cartErrors } = await getCart(user.id);

    const { data: total_price, error: totalPriceErrors } = await getTotalPrice(
      user.id,
    );

    if (cartErrors || totalPriceErrors) return;

    setCartItems(cartItems || []);
    setTotalPrice(total_price?.total_without_discount ?? 0);
    setTotalPriceDiscount(total_price?.total_with_discount ?? 0);
  };
  /* Functions */

  // ── Handlers ──
  const handleOpenDriverMenu = () => {
    setIsDriverPortalOpen(true);
  };
  const handleClose = () => {
    setIsDriverPortalOpen(false);
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <GlobalContext.Provider
      value={{
        toggleTheme,
        isMenuOpen,
        setIsMenuOpen,
        loading,
        setLoading,
        products,
        setProducts,
        page,
        totalPages,
        setPage,
        setTotalPages,
        wishlists,
        setWishlists,
        reviews,
        setReviews,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalPriceDiscount,
        setTotalPriceDiscount,
        addresses,
        setAddresses,
        cards,
        setCards,
        refreshCart,
        appliedTheme,
        bestSellerProducts,
        themeMode,
        handleOpenDriverMenu,
      }}
    >
      <AuthContext.Provider
        value={{ user, setUser, loadingUser, setLoadingUser, profile }}
      >
        <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
          <div
            className={`${appliedTheme === "light" ? "body-light" : "body-dark"}`}
            style={{ transition: "ease-in-out 0.3s" }}
          >
            <ToastContainer theme={appliedTheme} rtl={false} />
            {createPortal(
              isDriverPortalOpen ? (
                <div
                  className="portal-overlay"
                  style={{ justifyContent: "end" }}
                  onClick={handleOverlayClick}
                >
                  <DriverMenu handleClose={handleClose} />
                </div>
              ) : null,
              portalEl.current,
            )}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/forget" element={<ForgetPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/enter-new-password" element={<EnterPassword />} />
              /* Use Layout */
              <Route element={<MainLayout openMenu={openMenu} />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/product" element={<ProductView />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                /* Use Layout */
                <Route element={<ProfileLayout />}>
                  <Route path="/profile" element={<ProfileMain />} />
                  <Route path="/orders" element={<ProfileOrder />} />
                  <Route path="/wishlists" element={<ProfileWishlist />} />
                  <Route path="/addresses" element={<ProfileAddresses />} />
                  <Route path="/cards" element={<ProfileCards />} />
                  <Route
                    path="/notifications"
                    element={<ProfileNotifications />}
                  />
                  <Route path="/setting" element={<ProfileSetting />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </CheckoutContext.Provider>
      </AuthContext.Provider>
    </GlobalContext.Provider>
  );
}

export default App;
