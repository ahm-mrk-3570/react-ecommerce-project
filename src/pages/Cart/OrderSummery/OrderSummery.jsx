import OrderProduct from './OrderProduct/OrderProduct';
import './OrderSummery.css';

export default function OrderSummery() {
  return (
    <div className='order-summery-container'>
      <div className="order-summery">
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
        <OrderProduct />
      </div>
    </div>
  )
}
