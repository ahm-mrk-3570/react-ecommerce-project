/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";

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

function App() {
  /* State */
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
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
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
  /* State */

  /* Ref */
  const app = useRef(null);
  const menuRef = useRef(null);
  const btnMenuRef = useRef(null);
  /* Ref */

  /* Effect */
  useEffect(() => {
    if (theme === "light") {
      app.current.classList.remove("body-dark");
      app.current.classList.add("body-light");
      localStorage.setItem("theme", theme);
    } else if (theme === "dark") {
      app.current.classList.remove("body-light");
      app.current.classList.add("body-dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoadingUser(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
    if (!user) return;

    const fetchReviews = async () => {
      const { data, error } = await getReviews(user.id);

      if (error) return;

      setReviews(data);
    };

    fetchReviews();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.log(error);
          console.log("Profile fetch error:", error.message);
          toast.error(error.message);
          return;
        }

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
  /* Effect */

  /* Functions */
  const toggleTheme = (type) => {
    if (type === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    }

    if (type === "dark") {
      setTheme("light");
    }

    if (type === "light") {
      setTheme("dark");
    }
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";
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

  return (
    <GlobalContext.Provider
      value={{
        toggleTheme,
        menuRef,
        btnMenuRef,
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
        refreshCart
      }}
    >
      <AuthContext.Provider
        value={{ user, setUser, loadingUser, setLoadingUser, profile }}
      >
        <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
          <div ref={app} style={{ transition: "ease-in-out 0.3s" }}>
            <ToastContainer theme={theme} rtl={false} />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/forget" element={<ForgetPage />} />
              <Route path="/register" element={<Register />} />
              /* Use Layout */
              <Route element={<MainLayout openMenu={openMenu} />}>
                <Route
                  path="/"
                  element={
                    <MainPage
                      btnMenuRef={btnMenuRef}
                      menuRef={menuRef}
                      openMenu={openMenu}
                    />
                  }
                />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/product" element={<ProductView />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
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
