import Address from './Address/Address';  
import "./AddressTab.css";

export default function AddressTab({ visibleAddAddress }) {
  return (
    <div className="address-tab-profile">
      <button onClick={visibleAddAddress} className="add-new-address-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 6V18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M6 12H18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Add New Address
      </button>
      <Address />
      <Address />
      <Address />
      <Address />
      <Address />
      <Address />
    </div>
  );
}
