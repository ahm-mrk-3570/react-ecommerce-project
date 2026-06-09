import './Checkout.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PaymentSummery from '../Cart/PaymentSummery/PaymentSummery';
import ShippingAddress from './ShippingAddress/ShippingAddress';
import PaymentMethod from './PaymentMethod/PaymentMethod'
import Review from './Review/Review';
import { useRef } from 'react';
import OrderConfirmed from './OrderConfirmed/OrderConfirmed';

export default function Checkout() {
  const shipping = useRef();
  const payment = useRef();
  const review = useRef();
  const orderConfirmedRef = useRef();
  const checkoutPage = useRef();

  const handleStep = start => {
    if(start.toLowerCase().trim() === "home") {
      shipping.current.style.display = "none";
      payment.current.style.display = "flex";
    } else if(start.toLowerCase().trim() === "payment") {
      payment.current.style.display = "none";
      review.current.style.display = "flex";
    } else {
      console.log('Something went wrong....');
    }
  }

  const confirmOrder = () => {
    //...before tests
    orderConfirmedRef.current.style.display = "flex";
    checkoutPage.current.style.overflow = "hidden";
    checkoutPage.current.style.height = "100vh";
  }
  
  return (
    <>
      <title>Checkout</title>
      <div ref={checkoutPage} className='checkout-page'>
        <div className="main-checkout">
          <div className="checkout-sections">
            <ShippingAddress shipping={shipping} handleStep={handleStep} />
            <PaymentMethod payment={payment} handleStep={handleStep} />
            <Review review={review} />
          </div>
          <PaymentSummery buttonText="Place Order" handleButton={confirmOrder} />
        </div>
        <Footer />
        <OrderConfirmed orderConfirmedRef={orderConfirmedRef} />
      </div>
    </>
  )
}
