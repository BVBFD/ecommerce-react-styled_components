import { Visibility } from '@mui/icons-material';
import React from 'react';
import './widgetSm.css';

const WidgetSm = () => {
  return (
    <div className='widgetSm'>
      <span className='widgetSmTitle'>New Join Members</span>
      <ul className='widgetSmList'>
        <li className='widgetSmListItem'>
          <img
            src={
              'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
            }
            alt=''
            className='widgetSmImg'
          />
          <div className='widgetSmUser'>
            <span className='widgetSmUsername'>lsevina126</span>
          </div>
          <button className='widgetSmButton'>
            <Visibility className='widgetSmIcon' />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WidgetSm;
