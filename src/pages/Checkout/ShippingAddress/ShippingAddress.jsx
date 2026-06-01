import RoadCheckout from '../RoadCheckout/RoadCheckout';
import PastAddress from './PastAddress/PastAddress';
import AddAddress from './AddAddress/AddAddress';
import './ShippingAddress.css';
import NoneAddress from './NoneAddress/NoneAddress';

export default function ShippingAddress({ shipping, handleStep }) {
  return (
    <div ref={shipping} className='shipping-address'>
      <h1>Shipping Address</h1>
      <div className="shipping-main">
        <RoadCheckout step="home" />
        <div className="past-addresses-checkout">
          <div className="description-checkout">
            <h2>Select a delivery address</h2>
            <p>
              Is the address you'd like to use displayed below? If so, click the corresponding "Deliver to this address" button. Or you can enter a new delivery address.
            </p>
          </div>
          <div className="past-address-contaoiner">
            <PastAddress />
            <PastAddress />
            <PastAddress />
            <NoneAddress />
          </div>
          <button className='deliver-here' onClick={() => handleStep('home')}>Deliver Here</button>
        </div>
        <AddAddress handleStep={handleStep} />
      </div>
    </div>
  )
}