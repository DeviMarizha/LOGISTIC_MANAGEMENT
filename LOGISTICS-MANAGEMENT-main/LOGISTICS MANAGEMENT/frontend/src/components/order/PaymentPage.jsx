// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './PaymentPage.css';

// const PaymentPage = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const { orderDetails, totalPrice, distance } = state || {};

//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [paymentError, setPaymentError] = useState('');

//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handlePayment = (e) => {
//     e.preventDefault();

//     if (!paymentMethod) {
//       setPaymentError('Please select a payment method.');
//       return;
//     }

//     // Process payment here (e.g., API call)

//     // Redirect to a payment confirmation page
//     navigate('/order-summary', { state: { orderDetails, totalPrice, distance, paymentMethod } });
//   };

//   return (
//     <div className="payment-page">
//       <h2>Payment</h2>
//       <div className="payment-details">
//         <p>Weight Price: Rs. {orderDetails.shipmentItems.reduce((total, item) => total + item.weight * 100, 0)}</p>
//         <p>Freight + Distance Price: Rs. {totalPrice - orderDetails.shipmentItems.reduce((total, item) => total + item.weight * 100, 0)}</p>
//         <p>Total Price: Rs. {totalPrice}</p>
//       </div>

//       <form onSubmit={handlePayment}>
//         <h3>Select Payment Method</h3>
//         <div>
//           <input
//             type="radio"
//             id="onlinePayment"
//             name="paymentMethod"
//             value="Online Payment"
//             checked={paymentMethod === 'Online Payment'}
//             onChange={handlePaymentMethodChange}
//           />
//           <label htmlFor="onlinePayment">Online Payment</label>
//         </div>
//         <div>
//           <input
//             type="radio"
//             id="cashOnDelivery"
//             name="paymentMethod"
//             value="Cash on Delivery"
//             checked={paymentMethod === 'Cash on Delivery'}
//             onChange={handlePaymentMethodChange}
//           />
//           <label htmlFor="cashOnDelivery">Cash on Delivery</label>
//         </div>

//         {paymentError && <p className="error">{paymentError}</p>}

//         <button type="submit">Confirm Payment</button>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { orderDetails, totalPrice, distance } = state || {};

  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentError, setPaymentError] = useState('');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // const handlePayment = async (e) => {
  //   e.preventDefault();

  //   if (!paymentMethod) {
  //     setPaymentError('Please select a payment method.');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('/api/payment/process', {
  //       paymentMethod,
  //       totalPrice,
  //     });

  //     if (paymentMethod === 'Online Payment') {
  //       // Redirect to payment gateway
  //       window.location.href = response.data.redirectUrl;
  //     } else {
  //       // Redirect to order summary page
  //       navigate('/order-summary', { state: { orderDetails, totalPrice, distance, paymentMethod } });
  //     }
  //   } catch (error) {
  //     setPaymentError('Payment processing failed.');
  //   }
  // };
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
        setPaymentError('Please select a payment method.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8080/api/payment/process', {
            paymentMethod,
            totalPrice,
        });

        if (response.status === 200) {
            if (paymentMethod === 'Online Payment') {
                // Redirect to payment gateway
                window.location.href = response.data.redirectUrl;
            } else {
                // Redirect to order summary page
                navigate('/order-summary', { state: { orderDetails, totalPrice, distance, paymentMethod } });
            }
        } else {
            setPaymentError('Payment processing failed with status: ' + response.status);
        }
    } catch (error) {
        console.error('Payment error:', error);
        setPaymentError('Payment processing failed. Please try again later.');
    }
};
  return (
    <div className="payment-page">
      <h2>Payment</h2>
      <div className="payment-details">
        <p>Weight Price: Rs. {orderDetails.shipmentItems.reduce((total, item) => total + item.weight * 100, 0)}</p>
        <p>Freight + Distance Price: Rs. {totalPrice - orderDetails.shipmentItems.reduce((total, item) => total + item.weight * 100, 0)}</p>
        <p>Total Price: Rs. {totalPrice}</p>
      </div>

      <form onSubmit={handlePayment}>
        <h3>Select Payment Method</h3>
        <div>
          <input
            type="radio"
            id="onlinePayment"
            name="paymentMethod"
            value="Online Payment"
            checked={paymentMethod === 'Online Payment'}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="onlinePayment">Online Payment</label>
        </div>
        <div>
          <input
            type="radio"
            id="cashOnDelivery"
            name="paymentMethod"
            value="Cash on Delivery"
            checked={paymentMethod === 'Cash on Delivery'}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="cashOnDelivery">Cash on Delivery</label>
        </div>

        {paymentError && <p className="error">{paymentError}</p>}

        <button type="submit">Confirm Payment</button>
      </form>
    </div>
  );
};

export default PaymentPage;

