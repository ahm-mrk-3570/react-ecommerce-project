import { useLocation, useNavigate } from "react-router-dom";
import "./ProfileDriverContent.css";
import { useContext } from "react";
import GlobalContext from "../../../context/Context";

const _items = [
  {
    pathname: "/",
    title: "Home",
  },{
    pathname: "/profile",
    title: "Profile",
  },{
    pathname: "/orders",
    title: "Orders",
  },{
    pathname: "/wishlists",
    title: "Favorites",
  },{
    pathname: "/addresses",
    title: "Addresses",
  },{
    pathname: "/cards",
    title: "Cards",
  },{
    pathname: "/notifications",
    title: "Notifications",
  },{
    pathname: "/setting",
    title: "Setting",
  },
];

const ProfileDriverContent = ({ handleClose }) => {
  const { pathname } = useLocation();

  const { themeMode, toggleTheme } = useContext(GlobalContext);

  const navigate = useNavigate();

  return (
    <>
      <ul className="main-driver-content">
        {_items.map((i) => {
          return (
            <li>
              <button
                className={`${pathname === i.pathname ? "active-page" : null}`}
                onClick={() => {
                  navigate(i.pathname);
                  handleClose();
                }}
              >
                {i.title}
              </button>
            </li>
          );
        })}
      </ul>
      <ul className="handle-theme">
        {["dark", "light", "system"].map((t) => (
          <button
            key={t}
            className={`ps-theme-btn ${themeMode === t ? "ps-theme-btn--active" : ""}`}
            onClick={() => toggleTheme(t)}
          >
            <i
              className={`ti ti-${t === "dark" ? "moon" : t === "light" ? "sun" : "device-laptop"}`}
              aria-hidden="true"
            />
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </ul>
    </>
  );
};

export default ProfileDriverContent;
