import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const { data }: any = location.state;

  console.log(data);

  return (
    <div>
      <span>Success</span>
    </div>
  );
};

export default Success;
