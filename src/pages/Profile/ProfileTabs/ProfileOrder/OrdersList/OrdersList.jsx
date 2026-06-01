import OrderShow from './OrderShow/OrderShow';
import './OrdersList.css';

export default function OrdersList() {
  return (
    <div className='order-list-profile'>
      <OrderShow isDelivered={true} />
      <OrderShow isDelivered={false} />
      <OrderShow isDelivered={false} />
    </div>
  )
}
