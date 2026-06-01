import './PaymentMethods.css';

export default function PaymentMethods() {
  return (
    <div className='payment-methods-main'>
      <h2>Select Payment Method</h2>
      <ul className='payment-methods'>
        <li>
          <div className="payment-title">
            <input defaultChecked type="radio" id="payment-credit-card" name="payment-method" />
            <label htmlFor="payment-credit-card">Debit/Credit Card</label>
          </div>
          <div className="payment-credit-body">
            <div className="card-detail-box">
              <label htmlFor="card-number">Card Number</label>
              <input type="text" id="card-number" />
            </div>
            <div className="card-detail-box">
              <label htmlFor="card-name">Card Name</label>
              <input type="text" id='card-name' />
            </div>
            <div className="card-detail-box">
              <div className="expire-day">
                <label htmlFor="expiry-day">Expiry Day</label>
                <input type="text" id='expiry-day' />
              </div>
              <div className="cvv">
                <label htmlFor="cvv">CVV</label>
                <input type="text" id='cvv' />
              </div>
            </div>
          </div>
          <div className="add-card">
            Add Card
          </div>
        </li>
        <li>
          <div className="payment-title">
            <input type="radio" id="payment-google-play" name="payment-method" />
            <label htmlFor="payment-google-play">Google Play</label>
          </div>
        </li>
        <li>
          <div className="payment-title">
            <input type="radio" id="payment-paypal" name="payment-method" />
            <label htmlFor="payment-paypal">PayPal</label>
          </div>
        </li>
        <li>
          <div className="payment-title">
            <input type="radio" id="payment-cash" name="payment-method" />
            <label htmlFor="payment-cash">Cash on delivery</label>
          </div>
        </li>
      </ul>
    </div>
  )
}
