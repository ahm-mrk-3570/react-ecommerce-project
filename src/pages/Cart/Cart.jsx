import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import OrderSummery from './OrderSummery/OrderSummery';
import PaymentSummery from './PaymentSummery/PaymentSummery';
import './Cart.css';

export default function Cart() {
  return (
    <div className='checkout-page'>
      <Header />
      <div className="checkout-conent">
        <h2>Checkout</h2>
        <div className="checkout-section">
          <OrderSummery />
          <PaymentSummery buttonText="Go to checkout" />
        </div>
      </div>
      <Footer />
    </div>
  )
}
