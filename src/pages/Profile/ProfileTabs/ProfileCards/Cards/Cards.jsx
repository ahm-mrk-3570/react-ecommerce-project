import Card from './Card/Card';
import './Cards.css';

export default function Cards({ openCardContainer }) {
  return (
    <div className='card-profile-container'>
      <button onClick={openCardContainer} className="add-new-address-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 6V18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M6 12H18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Add New Card
      </button>
      <Card />
      <Card />
      <Card />
    </div>
  )
}
