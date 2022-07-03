import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const [price, setPrice] = useState(2000);

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
      <StripeCheckout
        label='Leo Shop'
        name='Pay Now'
        image='https://images.chosun.com/resizer/BzADectC5PmMDjNYKOg9mR6QDDA=/318x350/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/OCDXXRBXIUEZJKXN4FLMGR4KOM.jpg'
        billingAddress
        shippingAddress
        description={`your total is $${price / 100}`}
        amount={price}
        token={onToken}
        stripeKey='pk_test_51LHLA7KDRarv62Gzb5RdKPWxdt9ZTLyMbsO82WK3R4nkbHpA1ZbliD6oxuCCRf0BPLd5xFSmFd5kk8FnFMhxpznO00xujpH1o1'
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
    </div>
  );
};

export default Pay;
