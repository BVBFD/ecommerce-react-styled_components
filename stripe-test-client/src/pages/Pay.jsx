import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const [price, setPrice] = useState(2000);

  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          'http://localhost:8080/api/checkout/payment',
          {
            tokenId: stripeToken.id,
            amount: price,
          }
        );
        console.log(res.data);
        navigate('/success');
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {stripeToken ? (
        <span>Processing. Please wait...</span>
      ) : (
        <StripeCheckout
          label='Leo Shop'
          name='Pay Now'
          image='https://images.chosun.com/resizer/BzADectC5PmMDjNYKOg9mR6QDDA=/318x350/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/OCDXXRBXIUEZJKXN4FLMGR4KOM.jpg'
          billingAddress
          shippingAddress
          description={`your total is $${price / 100}`}
          amount={price}
          token={onToken}
          stripeKey={process.env.REACT_APP_STRIPE}
        >
          <button
            style={{
              border: 'none',
              width: 120,
              borderRadius: 5,
              padding: '20px',
              backgroundColor: 'black',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Pay Now
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
