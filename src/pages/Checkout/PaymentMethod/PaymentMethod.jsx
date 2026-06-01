import RoadCheckout from '../RoadCheckout/RoadCheckout';
import './PaymentMethod.css';
import PaymentMethods from './PaymentMethods/PaymentMethods';

export default function PaymentMethod({ payment, handleStep }) {
  return (
    <div ref={payment} className='payment-method'>
      <RoadCheckout step='card' />
      <PaymentMethods />
      <div className="add-card proccessed" onClick={() => handleStep('payment')}>
        Continue
      </div>
    </div>
  )
}
