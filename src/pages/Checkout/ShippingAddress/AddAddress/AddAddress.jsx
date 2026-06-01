import './AddAddress.css';

export default function AddAddress({ handleStep }) {
  return (
    <div className="add-address">
      <h2>Add a new Address</h2>
      <div className="name-address">
        <label htmlFor="name-address">Name</label>
        <input type="text" id='name-address' />
      </div>
      <div className="mobile-number-address">
        <label htmlFor="mobile-number-address">Mobile Number</label>
        <input type="text" id='mobile-number-address' />
      </div>
      <div className="house-address">
        <label htmlFor="house-address">Flat, House no., Building, Company, Apartment</label>
        <input type="text" id='house-address' />
      </div>
      <div className="area-address">
        <label htmlFor="area-address">Area, Colony, Street, Sector, Village</label>
        <input type="text" id='area-address' />
      </div>
      <div className="city-address">
        <label htmlFor="city-address">City</label>
        <select id="city-address">
          <option value="New York">New York</option>
          <option value="Chicago">Chicago</option>
          <option value="Los Angless">Los Angless</option>
        </select>
      </div>
      <div className="pin-code-address">
        <label htmlFor="pin-code-address">Pin Code</label>
        <input type="text" id='pin-code-address' />
      </div>
      <div className="use-default-address">
        <input type="checkbox" id='use-default-address' />
        <label htmlFor="use-default-address">Use as my default address</label>
      </div>
      <button className="add-new-address" onClick={() => handleStep('home')}>
        Add New Address
      </button>
    </div>
  )
}
