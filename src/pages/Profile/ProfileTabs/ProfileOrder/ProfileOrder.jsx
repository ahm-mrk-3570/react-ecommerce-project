/* eslint-disable react-hooks/refs */
import OrdersList from "./OrdersList/OrdersList";

import "./ProfileOrder.css";

import AuthContext from "../../../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import ProfileContext from "../../../../context/ProfileContext";
import { createPortal } from "react-dom";
import OrderView from "./OrderView/OrderView";
import { getOrders } from "../../../../services/orderServices";

export default function ProfileOrder() {
  const { openOrderView, selectedOrder, setOpenOrderView, setSelectedOrder } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);
  
  const [orders, setOrders] = useState([]);
  const order = orders.find((o) => o.id === selectedOrder);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const { data, error } = await getOrders(user.id)
      
      if(error) {
        console.log(error);
        return;
      }

      setOrders(data);
    };

    fetchOrders();
  }, [user]);

  const portalEl = useRef(document.querySelector(".portal-order-view"));

  useEffect(() => {
    if (!portalEl.current) return;
    portalEl.current.style.display = openOrderView ? "flex" : "none";
    document.body.style.overflow = openOrderView ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [openOrderView]);

  const handleClose = () => {
    setOpenOrderView(false);
    setSelectedOrder(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <>
      <title>Orders</title>
      <OrdersList orders={orders} setOrders={setOrders} />
      {openOrderView &&
        createPortal(
          <div className="portal-overlay" onClick={handleOverlayClick}>
            <OrderView
              order={order}
              selectedOrder={selectedOrder}
              onClose={handleClose}
            />
          </div>,
          portalEl.current,
        )}
    </>
  );
}
