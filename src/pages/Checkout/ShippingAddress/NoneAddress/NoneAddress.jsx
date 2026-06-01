import './NoneAddress.css';

export default function NoneAddress() {
  return (
    <div className="none-address">
      <div className="top-address">
        <label htmlFor='address-none'><h2>None</h2></label>
        <input type="radio" name="address-selector" id='address-none' />
      </div>
    </div>
  )
}
