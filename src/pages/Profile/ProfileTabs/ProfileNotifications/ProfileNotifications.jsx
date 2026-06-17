import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./ProfileNotifications.css";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import AuthContext from "../../../../context/AuthContext";

dayjs.extend(relativeTime);

// Icon map by notification type
const TYPE_META = {
  login: { icon: "ti-login", color: "blue", label: "Security" },
  register: { icon: "ti-user-check", color: "green", label: "Account" },
  email_verified: { icon: "ti-mail-check", color: "green", label: "Account" },
  order_placed: { icon: "ti-shopping-bag", color: "amber", label: "Order" },
  order_shipped: { icon: "ti-truck", color: "amber", label: "Order" },
  order_delivered: { icon: "ti-package", color: "green", label: "Order" },
  order_cancelled: { icon: "ti-x", color: "red", label: "Order" },
  wishlist_sale: { icon: "ti-heart", color: "pink", label: "Wishlist" },
  promo: { icon: "ti-tag", color: "purple", label: "Promo" },
};

const FILTERS = ["All", "Activity", "Orders", "Promotions"];

const FILTER_TYPES = {
  Activity: ["login", "register", "email_verified"],
  Orders: [
    "order_placed",
    "order_shipped",
    "order_delivered",
    "order_cancelled",
  ],
  Promotions: ["wishlist_sale", "promo"],
};

const NotifItem = ({ notif, onRead }) => {
  const meta = TYPE_META[notif.type] || TYPE_META.promo;

  return (
    <div
      className={`pn-item ${!notif.is_read ? "pn-item--unread" : ""}`}
      onClick={() => !notif.is_read && onRead(notif.id)}
    >
      <div className={`pn-icon pn-icon--${meta.color}`}>
        <i className={`ti ${meta.icon}`} aria-hidden="true" />
      </div>
      <div className="pn-item__body">
        <div className="pn-item__top">
          <span className="pn-item__title">{notif.title}</span>
          <span className="pn-item__time">
            {dayjs(notif.created_at).fromNow()}
          </span>
        </div>
        <p className="pn-item__msg">{notif.message}</p>
        <span className={`pn-item__label pn-item__label--${meta.color}`}>
          {meta.label}
        </span>
      </div>
      {!notif.is_read && <span className="pn-unread-dot" aria-label="Unread" />}
    </div>
  );
};

export default function ProfileNotifications() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetch = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setNotifications(data || []);
      setLoading(false);
    };

    fetch();
  }, [user]);

  const handleRead = async (id) => {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    );
  };

  const handleReadAll = async () => {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const filtered =
    filter === "All"
      ? notifications
      : notifications.filter((n) => FILTER_TYPES[filter]?.includes(n.type));

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="pn-page">
      <div className="pn-header">
        <div>
          <h2 className="pn-title">Notifications</h2>
          <p className="pn-subtitle">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="pn-read-all-btn" onClick={handleReadAll}>
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="pn-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`pn-filter-btn ${filter === f ? "pn-filter-btn--active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="pn-list">
        {loading ? (
          <div className="pn-empty">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="pn-empty">
            <i className="ti ti-bell-off" aria-hidden="true" />
            <p>No notifications here</p>
          </div>
        ) : (
          filtered.map((n) => (
            <NotifItem key={n.id} notif={n} onRead={handleRead} />
          ))
        )}
      </div>
    </div>
  );
}
