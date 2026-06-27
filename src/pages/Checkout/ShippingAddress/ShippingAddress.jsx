/* eslint-disable react-hooks/refs */
import RoadCheckout from "../RoadCheckout/RoadCheckout";
import PastAddress from "./PastAddress/PastAddress";
import AddAddress from "./AddAddress/AddAddress";
import "./ShippingAddress.css";
import NoneAddress from "./NoneAddress/NoneAddress";
import { useContext, useEffect, useRef, useState } from "react";
import GlobalContext from "../../../context/Context";
import CheckoutContext from "../../../context/CheckoutContext";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { updateAddress } from "../../../services/addressServices";
import AddressPortal from "../../Profile/ProfileTabs/ProfileAddresses/AddressPortal/AddressPortal";

export default function ShippingAddress({ step, setStep }) {
  const [addressId, setAddressId] = useState(null);
  const [openPortal, setOpenPortal] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  const { addresses, setAddresses } = useContext(GlobalContext);
  const { setCheckoutData } = useContext(CheckoutContext);

  const portalEl = useRef(document.querySelector(".portal-address-view"));
  useEffect(() => {
    if (!portalEl.current) return;
    portalEl.current.style.display = openPortal ? "flex" : "none";
    document.body.style.overflow = openPortal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openPortal]);

  const handleOpenEdit = (address) => {
    setEditAddress(address);
    setOpenPortal(true);
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleClose = () => {
    setOpenPortal(false);
    setEditAddress(null);
  };

  const handleSubmit = async (form, id) => {
    const { error } = await updateAddress(id, form);
    if (error) {
      toast.error("Failed to update address");
      return;
    }
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...form } : a)),
    );
    toast.success("Address updated");
  };

  return (
    <div
      style={{ display: step === 1 ? "flex" : "none" }}
      className="shipping-address"
    >
      <h4>Shipping Address</h4>
      <div className="shipping-main">
        <RoadCheckout step="home" setStep={setStep} />
        <div className="past-addresses-checkout">
          <div className="description-checkout">
            <h5>Select a delivery address</h5>
            <p>
              Is the address you'd like to use displayed below?
              <br />If so, click the
              corresponding "Deliver to this address" button. Or you can enter a
              new delivery address.
            </p>
          </div>
          <div className="past-address-contaoiner">
            {addresses &&
              addresses.map((address, i) => {
                return (
                  <PastAddress
                    address={address}
                    key={i}
                    addressId={addressId}
                    setAddressId={setAddressId}
                    onEdit={handleOpenEdit}
                  />
                );
              })}
            <NoneAddress addressId={addressId} setAddressId={setAddressId} />
          </div>
          <button className="deliver-here"
            onClick={() => {
              if (addressId !== "" && addressId !== null) {
                setCheckoutData((prev) => ({ ...prev, addressId }));
                setStep(2);
              } else {
                toast.error("Please Select an address")
              }
            }}
          >
            Deliver Here
          </button>
        </div>
        {addressId === "" ? <AddAddress /> : null}
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
