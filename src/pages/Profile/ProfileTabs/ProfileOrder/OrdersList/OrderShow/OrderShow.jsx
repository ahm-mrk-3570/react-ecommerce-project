import './OrderShow.css';

export default function OrderShow({ isDelivered }) {
  return (
    <div className='order-show-profile'>
      <div className="top-order-show">
        <div className="top-l-order-show">
          <div className="img-order-show-container">
            <img src="/main-images/products/01.png" height={80} alt="order-product0" />
          </div>
          <div className="order-show-detail">
            <h2>Girls Pink Moana Printed Dress</h2>
            <span>Size: <span>S</span></span>
            <span>Quantity: <span>1</span></span>
          </div>
        </div>
        <div className="top-r-order-show">
          <button>View Order</button>
          <button style={{
            backgroundColor : isDelivered ? 'var(--bg-secondary-color)' : 'red',
            color : isDelivered ? 'var(--text-secondary-color)' : 'white',
          }}>{isDelivered ? 'Write A Review' : 'Cancel Order'}</button>
        </div>
      </div>
      <div className="bottom-order-show">
        <span style={{
          backgroundColor : isDelivered ? '#e2ffb4' : '#fff59a',
          color : isDelivered ? '#00bb00' : '#d3be00',
        }}>{isDelivered ? 'Delivered' : 'In Process'}</span>
        <span>Your Product has been {isDelivered ? 'delivered' : 'Inprocess'}</span>
      </div>
    </div>
  )
}
