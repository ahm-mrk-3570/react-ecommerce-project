import FormInputBox from '../../../../../components/FormInputBox/FormInputBox';
import './AddCard.css';

export default function AddCard({ cardContainer, closeCardContainer }) {

  return (
    <div ref={cardContainer} className='add-card-container'>
      <div className="add-card-box">
        <h2>Add New Card</h2>
        <div className="city-address">
          <label htmlFor="city-address">City</label>
          <select id="city-address">
            <option value="Master Card">Master Card</option>
            <option value="Visa Card">Visa Card</option>
          </select>
        </div>
        <FormInputBox title="Card Name" placeHolder="Card Name" color="black" />
        <FormInputBox title="Card Number" placeHolder="Card Number" color="black" />
        <div className="buttons-add-address">
          <button onClick={closeCardContainer}>Cancel</button>
          <button>Add New Card</button>
        </div>
      </div>
    </div>
  )
}
