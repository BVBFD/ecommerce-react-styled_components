import React from 'react';
import './widgetLg.css';

type ButtonType = {
  type?: string;
};

const WidgetLg = () => {
  const Button = ({ type }: ButtonType) => {
    return <button className={'widgetLgButton'}>Connected</button>;
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

        <tr className='widgetLgTr'>
          {/* thread of table */}
          <td className='widgetLgUser'>
            {/* thread detail */}
            <span className='widgetLgName'>lsevina126</span>
          </td>
          <td className='widgetLgDate'>2 Jun 2021</td>
          <td className='widgetLgAmount'>$200</td>
          <td className='widgetLgStatus'>
            <Button type='Declined' />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default WidgetLg;
