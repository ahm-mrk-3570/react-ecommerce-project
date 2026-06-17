import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import FloatCart from "../FloatCart/FloatCart";
import { useContext, useRef } from "react";
import AuthContext from "../../context/AuthContext";

const menuData = [
  {
    title: "Clothing",
    items: [
      {
        title: "T-Shirts",
        link: "/products?category=t-shirts",
      },
      {
        title: "Shirts",
        link: "/products?category=shirts",
      },
      {
        title: "Hoodies",
        link: "/products?category=hoodies",
      },
      {
        title: "Jeans",
        link: "/products?category=jeans",
      },
    ],
  },
  {
    title: "Outerwear",
    items: [
      {
        title: "Jackets",
        link: "/products?category=jackets",
      },
      {
        title: "Winter Clothes",
        link: "/products?category=winter-clothes",
      },
    ],
  },
  {
    title: "Collections",
    items: [
      {
        title: "All Products",
        link: "/products",
      },
      {
        title: "Best Sellers",
        link: "/products?category=best-seller",
      },
      {
        title: "New Arrivals",
        link: "/products?category=new-arrivals",
      },
      {
        title: "Featured Items",
        link: "/products?category=featured",
      },
    ],
  },
];

export default function Header({ openMenu }) {
  const floatCartRef = useRef(null);

  const navigate = useNavigate();

  const { user, profile } = useContext(AuthContext);

  const openCart = () => {
    if (floatCartRef.current.style.display === "flex") {
      floatCartRef.current.style.display = "none";
    } else {
      floatCartRef.current.style.display = "flex";
    }
  };

  return (
    <header>
      <div className="header">
        <div className="header-left">
          <Link to="/">
            <img src={`${import.meta.env.BASE_URL}/logo.svg`} />
            <h1>Crimba</h1>
          </Link>
        </div>
        <ul className="header-middle">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="shop-menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
            <Link to="/products">Shop</Link>
          </li>
          <li>Our Story</li>
          <li>Blog</li>
          <li>Contact Us</li>
          <nav className="navigation">
            {menuData.map((section) => (
              <div key={section.title}>
                <h3>{section.title}</h3>

                {section.items.map((item) => (
                  <Link key={item.title} to={item.link}>
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </ul>
        <div className="header-right">
          <div className="items">
            <div className="search-item">
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
            </div>
            <Link className="favorite-item" to={user ? "/wishlists" : "/login"}>
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
              onClick={openCart}
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
              <FloatCart floatCartRef={floatCartRef} />
            </div>
          </div>
          {user ? (
            <div onClick={() => navigate('/profile')} className="profile" style={{ display: "flex", cursor: "pointer" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
              <span>{profile?.first_name + profile?.last_name || ""}</span>
            </div>
          ) : (
            <Link to="/login" className="login">
              Login
            </Link>
          )}
        </div>
        <div onClick={openMenu} className="menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
