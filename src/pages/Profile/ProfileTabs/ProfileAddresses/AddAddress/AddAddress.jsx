import FormInputBox from '../../../../../components/FormInputBox/FormInputBox';
import './AddAddress.css';

export default function AddAddress({ addAddressBg, closeConainer }) {

  return (
    <div ref={addAddressBg} className='bg-add-address'>
      <div className="add-address-container">
        <h2>Add a new Address</h2>
        <FormInputBox title="Name" placeHolder="Name" color="black" />
        <FormInputBox title="Mobile Number" placeHolder="Mobile Number" color="black" />
        <FormInputBox title="Flat, House no., Building, Company, Apartment" color="black" />
        <FormInputBox title="Area, Colony, Street, Sector, Village" color="black" />
        <div className="city-address">
          <label htmlFor="city-address">City</label>
          <select id="city-address">
            <option value="New York">New York</option>
            <option value="Chicago">Chicago</option>
            <option value="Los Angless">Los Angless</option>
          </select>
        </div>
        <FormInputBox title="Pin Code" placeHolder="Pin Code" color="Black"/>
        <div className="use-default-address">
          <input type="checkbox" id='use-default-address' />
          <label htmlFor="use-default-address">Use as my default address</label>
        </div>
        <div onClick={closeConainer} className="buttons-add-address">
          <button>Cancel</button>
          <button>Add New Address</button>
        </div>
      </div>
    </div>
  )
}
