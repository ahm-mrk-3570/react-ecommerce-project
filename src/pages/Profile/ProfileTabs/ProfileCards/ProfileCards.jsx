/* eslint-disable react-hooks/refs */
import { useContext, useEffect, useRef, useState } from "react";
import "./ProfileCards.css";
import { addCard, removeCard } from "../../../../services/cardServices";
import Card from "./Card/Card";
import { createPortal } from "react-dom";
import PortalCard from "./PortalCard/PortalCard";
import { toast } from "react-toastify";
import GlobalContext from "../../../../context/Context";
import AuthContext from "../../../../context/AuthContext";

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

export default function ProfileCards() {
  const { cards, setCards } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);

  const [openPortal, setOpenPortal] = useState(false);

  const portalEl = useRef(document.querySelector(".portal-card-view"));

  useEffect(() => {
    if (!portalEl.current) return;
    portalEl.current.style.display = openPortal ? "flex" : "none";
    document.body.style.overflow = openPortal ? "hidden" : "";
    () => { document.body.style.overflow = "" }
  }, [openPortal])

  const handleOpen = () => {
    setOpenPortal(true);
  }

  const handleClose = () => {
    setOpenPortal(false)
  }
  
  const handleSubmit = async (form) => {
    const { data, error } = await addCard({ ...form, user_id: user?.id });

    if(error) { 
      toast.error(error.message); 
      return; 
    }

    setCards(prev => [...prev, data]);
    toast.success("Card Added");
  }

  const handleRemove = async (id) => {
    const { error } = await removeCard(id);

    if(error) {
      toast.error(error.message);
      return;
    }

    setCards(prev => prev.filter(p => p.id !== id));
    toast.success("Card Removed Successfully")
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  }

  return (
    <div className="profile-cards">
      <title>Cards</title>
      <div className="header-profile-cards">
        <div className="details-card-total">
          <h2>Manage Cards</h2>
          <p>{cards.length} cards saved</p>
        </div>
        <button onClick={handleOpen} className="button-card-profile">
          <PlusIcon />
          Add New
        </button>
      </div>
      {cards.length === 0 ? (
        <div className="no-card-container">
          <p>No Card Yet</p>
          <button onClick={handleOpen} className="button-card-profile">
            <PlusIcon />
            Add your first card
          </button>
        </div>
      ) : (
        <div className="cards-container">
          {cards.map((card) => (
            <Card key={card.id} cardDetail={card} handleRemove={handleRemove} />
          ))}
        </div>
      )}

      {createPortal(
        openPortal ? (
          <div className="portal-overlay" onClick={handleOverlayClick}>
            <PortalCard
              onClose={handleClose}
              onSubmit={handleSubmit}
            />
          </div>
        ) : null,
        portalEl.current,
      )}
    </div>
  );
}
