import dayjs from 'dayjs';
import './ReviewOrder.css';
import ReviewProduct from './ReviewProduct/ReviewProduct';
import { useContext } from 'react';
import GlobalContext from '../../../../context/Context';

export default function ReviewOrder() {
  const date = new Date();
  const { cartItems } = useContext(GlobalContext);

  return (
    <div className='order-review'>
      <h2 className="order-date">
        Estimated Delivery : {dayjs(date).format("MMM DD, YYYY")}
      </h2>
      {cartItems && cartItems.map(item => {
        return (
          <ReviewProduct key={item.id} item={item} />
        )
      })}
    </div>
  )
}
