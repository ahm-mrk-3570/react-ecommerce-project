/* eslint-disable react-hooks/refs */
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import FloatCart from "../FloatCart/FloatCart";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";
import GlobalContext from "../../context/Context";
import { createPortal } from "react-dom";
import Search from "../Search/Search";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const portalEl = useRef(document.querySelector(".portal-search-box"));

  useEffect(() => {
    if (!portalEl.current) return;
    portalEl.current.style.display = isSearchOpen ? "flex" : "none";
    document.body.style.overflow = isSearchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };
  const handleClose = () => {
    setIsSearchOpen(false);
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const navigate = useNavigate();

  const { user, profile } = useContext(AuthContext);
  const { handleOpenDriverMenu } = useContext(GlobalContext);

  return (
    <>
      <header>
        <div className="header container-custom">
          <div className="header-left">
            <Link to="/">
              <img src={`${import.meta.env.BASE_URL}/logo.svg`} />
              <h4>Crimba</h4>
            </Link>
          </div>
          <ul className="header-middle">
            <Link to="/">Home</Link>
            <Link to="/products">Shop</Link>
            <Link to="/" className="our-story">
              Our Story
            </Link>
            <Link to="/" className="blog">
              Blog
            </Link>
            <Link to="/" className="contact-us">
              Contact Us
            </Link>
          </ul>
          <div className="header-right">
            <div className="items">
              <button className="search-item" onClick={() => setIsSearchOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
              <Link
                className="favorite-item"
                to={user ? "/wishlists" : "/login"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
              </Link>
              <div
                onClick={() => setIsCartOpen(!isCartOpen)}
                style={{ position: "relative" }}
                className="basket-item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-bag"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                </svg>
                <FloatCart isCartOpen={isCartOpen} />
              </div>
            </div>
            {user ? (
              <div onClick={() => navigate("/profile")} className="profile">
                <img height={35} src={profile?.avatar} />
                <span>
                  {profile?.first_name + " " + profile?.last_name || ""}
                </span>
              </div>
            ) : (
              <Link to="/login" className="login">
                Login
              </Link>
            )}
          </div>
          <button onClick={handleOpenDriverMenu} className="menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              style={{ fill: "var(--text-primary)" }}
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
        </div>
      </header>
      {createPortal(
        setIsSearchOpen ? (
          <div
            className="portal-overlay"
            onClick={handleOverlayClick}
          >
            <Search onClose={handleClose} />
          </div>
        ) : null,
        portalEl.current,
      )}
    </>
  );
}
