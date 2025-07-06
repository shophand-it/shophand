import React from 'react';

const StripeCheckout = () => {
  const handleCheckout = async () => {
    const res = await fetch('/api/payment/create-checkout-session', {
      method: 'POST',
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div>
      <button onClick={handleCheckout}>
        Pay Now
      </button>
    </div>
  );
};

export default StripeCheckout;