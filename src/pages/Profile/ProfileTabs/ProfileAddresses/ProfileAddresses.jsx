/* eslint-disable react-hooks/refs */
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../../context/AuthContext";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  setDefaultAddress,
  updateAddress,
} from "../../../../services/addressServices";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import "./ProfileAddresses.css";
import AddressPortal from "./AddressPortal/AddressPortal";
import AddressCard from "./AddressCard/AddressCard";
import GlobalContext from "../../../../context/Context";

const PlusIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function ProfileAddresses() {
  const { user } = useContext(AuthContext);
  
  const [openPortal, setOpenPortal] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  const portalEl = useRef(document.querySelector(".portal-address-view"));

  const { addresses, setAddresses } = useContext(GlobalContext);

  // ── Portal visibility ──
  useEffect(() => {
    if (!portalEl.current) return;
    portalEl.current.style.display = openPortal ? "flex" : "none";
    document.body.style.overflow = openPortal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openPortal]);

  // ── Handlers ──
  const handleOpenAdd = () => {
    setEditAddress(null);
    setOpenPortal(true);
  };
  const handleOpenEdit = (address) => {
    setEditAddress(address);
    setOpenPortal(true);
  };
  const handleClose = () => {
    setOpenPortal(false);
    setEditAddress(null);
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleSubmit = async (form, id) => {
    if (id) {
      const { error } = await updateAddress(id, form);
      if (error) {
        toast.error("Failed to update address");
        return;
      }
      setAddresses((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...form } : a)),
      );
      toast.success("Address updated");
    } else {
      const { data, error } = await addAddress({ ...form, user_id: user.id });
      if (error) {
        toast.error("Failed to add address");
        return;
      }
      setAddresses((prev) => [...prev, data]);
      toast.success("Address added");
    }
  };

  const handleDelete = async (id) => {
    const { error } = await deleteAddress(id);
    if (error) {
      toast.error("Failed to delete address");
      return;
    }
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address removed");
  };

  const handleSetDefault = async (id) => {
    const { error } = await setDefaultAddress(id, user.id);
    if (error) {
      toast.error("Failed to set default");
      return;
    }
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, is_default: a.id === id })),
    );
    toast.success("Default address updated");
  };

  return (
    <div className="manage-addr">
      <title>Addresses</title>
      <div className="manage-addr__header">
        <div>
          <h2 className="manage-addr__title">Manage Addresses</h2>
          <p className="manage-addr__subtitle">
            {addresses.length} address{addresses.length !== 1 ? "es" : ""} saved
          </p>
        </div>
        <button className="manage-addr__add-btn" onClick={handleOpenAdd}>
          <PlusIcon />
          Add New
        </button>
      </div>

      <div className="manage-addr__list">
        {addresses.length === 0 ? (
          <div className="manage-addr__empty">
            <p>No addresses yet</p>
            <button className="manage-addr__add-btn" onClick={handleOpenAdd}>
              <PlusIcon /> Add your first address
            </button>
          </div>
        ) : (
          addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          ))
        )}
      </div>

      {createPortal(
        openPortal ? (
          <div className="portal-overlay" onClick={handleOverlayClick}>
            <AddressPortal
              onClose={handleClose}
              onSubmit={handleSubmit}
              editAddress={editAddress}
            />
          </div>
        ) : null,
        portalEl.current,
      )}
    </div>
  );
}
