import './ReviewOrder.css';
import ReviewProduct from './ReviewProduct/ReviewProduct';

export default function ReviewOrder() {
  const date = new Date();
  return (
    <div className='order-review'>
      <h2 className="order-date">
        Estimated Delivery : {date.getDate()} {date.getMonth()} {date.getFullYear()}
      </h2>
      <ReviewProduct />
      <ReviewProduct />
      <ReviewProduct />
      <ReviewProduct />
    </div>
  )
}
