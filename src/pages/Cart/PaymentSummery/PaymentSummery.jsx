import './PaymentSummery.css';

export default function PaymentSummery({ buttonText, handleButton }) {
  return (
    <div className="payment-summery-container">
      <div className="payment-summery">
        <div className="top-section-payment">
          <h1>Order Summery</h1>
          <div className='subtotal-price'>
            <span>Subtotal</span>
            <span>$185</span>
          </div>
          <div className='discount-size'>
            <span>Discount {`(-20%)`}</span>
            <span>-$113</span>
          </div>
          <div className='delivery-fee'>
            <span>Delivery Fee</span>
            <span>$15</span>
          </div>
        </div>
        <div className="bottom-section-payment">
          <div className='total-finally'>
            <span>Total</span>
            <span>$467</span>
          </div>
          <div className="promo-code">
            <div className='enter-promo-code'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24">
                <path d="M10.839,1.003l11.747,11.747-9.836,9.836L1.002,10.837V1.003h9.837M11.25,0l-.003.003H.002v11.245l-.002.002,12.75,12.75,11.25-11.25L11.25,0h0Z"/>
                <rect x="2.315" y="2.315" width="3.505" height="3.505"/>
              </svg>
              <input type="text" placeholder='Add promo code' />
            </div>
            <div className='apply-promo-code'>
              Apply
            </div>
          </div>
          <div className="go-to-checkout" onClick={handleButton}>
            {buttonText}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
