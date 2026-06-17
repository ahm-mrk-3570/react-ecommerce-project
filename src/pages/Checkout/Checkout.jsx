import './Checkout.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PaymentSummery from '../Cart/PaymentSummery/PaymentSummery';
import ShippingAddress from './ShippingAddress/ShippingAddress';
import PaymentMethod from './PaymentMethod/PaymentMethod'
import Review from './Review/Review';
import { useState } from 'react';
import OrderConfirmed from './OrderConfirmed/OrderConfirmed';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [showConfirmed, setShowConfirmed] = useState(false);
  
  return (
    <>
      <title>Checkout</title>
      <div className='checkout-page'>
        <div className="main-checkout">
          <div className="checkout-sections">
            <ShippingAddress step={step} setStep={setStep} />
            <PaymentMethod step={step} setStep={setStep} />
            <Review step={step} setStep={setStep} />
          </div>
          <PaymentSummery step={step} buttonText="Place Order" setShowConfirmed={setShowConfirmed} />
        </div>
        <Footer />
        <OrderConfirmed showConfirmed={showConfirmed} />
      </div>
    </>
  )
}
