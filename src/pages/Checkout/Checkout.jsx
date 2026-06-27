import "./Checkout.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PaymentSummery from "../Cart/PaymentSummery/PaymentSummery";
import ShippingAddress from "./ShippingAddress/ShippingAddress";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import Review from "./Review/Review";
import { useEffect, useRef, useState } from "react";
import OrderConfirmed from "./OrderConfirmed/OrderConfirmed";
import { createPortal } from "react-dom";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [openPortal, setOpenPortal] = useState(false);

  const portalEl = useRef(document.querySelector(".portal-confirmed"));

  // ── Portal visibility ──
  useEffect(() => {
    if (!portalEl.current) return;
    portalEl.current.style.display = openPortal ? "flex" : "none";
    document.body.style.overflow = openPortal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openPortal]);

  const handleClose = () => {
    setOpenPortal(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <>
      <title>Checkout</title>
      <div className="checkout-page container-custom">
        <div className="main-checkout">
          <div className="checkout-sections">
            <ShippingAddress step={step} setStep={setStep} />
            <PaymentMethod step={step} setStep={setStep} />
            <Review step={step} setStep={setStep} />
          </div>
          <PaymentSummery
            step={step}
            buttonText="Place Order"
            setOpenPortal={setOpenPortal}
          />
        </div>
        <Footer />
        {createPortal(
          openPortal === true ? (
            <div className="portal-overlay" onClick={handleOverlayClick}>
              <OrderConfirmed openPortal={openPortal} />
            </div>
          ) : null,
          portalEl.current,
        )}
      </div>
    </>
  );
}
