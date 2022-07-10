import React, { useEffect, useState } from 'react';
import './widgetLg.css';
import { UserType } from '../../redux/userRedux';
import { userRequest } from '../../requestMethods';
import { format } from 'timeago.js';

type ButtonType = {
  type?: 'approved' | 'declined' | 'pending';
};

type OrderType = {
  userId: string;
  products: Array<{ productId: string; quantity: number }>;
  amount: number;
  address: object;
  status: ButtonType['type'];
  _id: string;
  _v?: Int32List;
  createdAt?: number;
  updatedAt?: number;
};

const WidgetLg = () => {
  const [orders, setOrders] = useState<OrderType[]>();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get('/orders');
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const Button = ({ type }: ButtonType) => {
    return <button className={`widgetLgButton ${type}`}>{type}</button>;
  };
  return (
    <div className='widgetLg'>
      <h3 className='widgetLgTitle'>Latest transactions</h3>
      <table className='widgetLgTable'>
        {/* table */}
        <tr className='widgetLgTr'>
          {/* thread of table */}
          <th className='widgetLgTh'>Customer</th>
          {/* thread head */}
          <th className='widgetLgTh'>Date</th>
          <th className='widgetLgTh'>Amount</th>
          <th className='widgetLgTh'>Status</th>
        </tr>

        {orders?.map((order) => (
          <tr className='widgetLgTr' key={order._id}>
            {/* thread of table */}
            <td className='widgetLgUser'>
              {/* thread detail */}
              <span className='widgetLgName'>{order.userId}</span>
            </td>
            <td className='widgetLgDate'>
              {format(order.createdAt as number)}
            </td>
            <td className='widgetLgAmount'>${order.amount}</td>
            <td className='widgetLgStatus'>
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default WidgetLg;
