import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';
import axios from 'axios';
const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

//   const handleNext = () => {
//     if (paymentMethod === 'cod') {
//       navigate('/success'); // Redirect to success page for COD
//     } else if (paymentMethod === 'credit' || paymentMethod === 'debit') {
//       navigate('/paycard'); // Redirect to paycard page for Credit/Debit
//     }
//   };

const handleNext = async () => {
    try {
      const paymentDetails = { paymentMethod };
  
      if (paymentMethod === 'cod') {
        await axios.post('http://localhost:8080/api/payment', paymentDetails);
        navigate('/success');
      } else if (paymentMethod === 'credit' || paymentMethod === 'debit') {
        navigate('/paycard', { state: { paymentMethod } });
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="payment-container">
      <h2>Select Payment Method</h2>
      <div className="payment-methods">
        <div className="payment-method">
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            value="cod"
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="cod">Cash on Delivery</label>
        </div>
        <div className="payment-method">
          <input
            type="radio"
            id="credit"
            name="paymentMethod"
            value="credit"
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="credit">Credit Card</label>
        </div>
        <div className="payment-method">
          <input
            type="radio"
            id="debit"
            name="paymentMethod"
            value="debit"
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="debit">Debit Card</label>
        </div>
      </div>
      <div className="payment-buttons">
        {/* <button onClick={() => navigate('/order-summary')}>Back</button> */}
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Payment;




