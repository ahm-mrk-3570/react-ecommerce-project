import './Review.css';
import RoadCheckout from '../RoadCheckout/RoadCheckout';
import ReviewOrder from './ReviewOrder/ReviewOrder';
import ReviewAddress from './ReviewAddress/ReviewAddress';
import ReviewPayments from './ReviewPayments/ReviewPayments';

export default function Review({ review }) {
  return (
    <div ref={review} className='review-checkout'>
      <RoadCheckout step='review' />
      <ReviewOrder />
      <ReviewAddress />
      <ReviewPayments />
    </div>
  )
}