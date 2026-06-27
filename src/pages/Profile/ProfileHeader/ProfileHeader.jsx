import { useLocation } from "react-router-dom";
import "./ProfileHeader.css";

const titles = {
  profile: "My Profile",
  orders: "My Orders",
  wishlists: "Favorites",
  addresses: "Addresses",
  cards: "Cards",
  notifications: "Notifications",
  setting: "Setting",
};

export default function ProfileHeader() {
  const data = useLocation();
  const location = data.pathname.slice(1);
  const title = titles[location];

  return (
    <div className="header-profile">
      <h3>{title}</h3>
    </div>
  );
}
