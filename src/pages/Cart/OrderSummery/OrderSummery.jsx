import { useContext } from 'react';
import OrderProduct from './OrderProduct/OrderProduct';
import './OrderSummery.css';
import GlobalContext from '../../../context/Context';

export default function OrderSummery() {

  const { cartItems } = useContext(GlobalContext);

  return (
    <div className='order-summery-container'>
      <div className="order-summery">
        {cartItems && cartItems.map((item, i) => {
          return (
            <OrderProduct key={i} cartItem={item} />
          )
        })}
      </div>
    </div>
  )
}
