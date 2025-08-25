import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "react-credit-cards";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import "react-credit-cards/es/styles-compiled.css";
import "./PayCard.css"; // Import the CSS file
import axios from "axios";
const PayCard = () => {
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focused: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputFocus = (e) => {
    setCardDetails({ ...cardDetails, focused: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can add payment processing logic here
//     // For now, we just navigate to the success page
//     navigate("/success");
//   };

// const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const paymentDetails = {
//       paymentMethod: location.state.paymentMethod,
//       cardNumber: cardDetails.number,
//       cardName: cardDetails.name,
//       cardExpiry: cardDetails.expiry,
//       cardCvc: cardDetails.cvc,
//     };
  
//     try {
//       await axios.post('http://localhost:8080/api/payment', paymentDetails);
//       navigate('/success');
//     } catch (error) {
//       console.error('Payment failed:', error);
//     }
// };

const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentDetails = {
      paymentMethod: location.state.paymentMethod,
      cardNumber: cardDetails.number,
      cardName: cardDetails.name,
      cardExpiry: cardDetails.expiry,
      cardCvc: cardDetails.cvc,
    };

    try {
      await axios.post(`http://localhost:8080/api/payment`, paymentDetails); // Pass orderId in the URL
      navigate('/success');
    } catch (error) {
      console.error('Payment failed:', error);
    }
};


  return (
    <div className="App-payment">
      <Typography variant="h5" gutterBottom>
        Enter Your Card Details
      </Typography>
      <div>
        <Card
          number={cardDetails.number}
          name={cardDetails.name}
          expiry={cardDetails.expiry}
          cvc={cardDetails.cvc}
          focused={cardDetails.focused}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          type="tel"
          name="number"
          placeholder="Card Number"
          required
          margin="normal"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <TextField
          variant="outlined"
          type="text"
          name="name"
          placeholder="Name"
          required
          margin="normal"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <TextField
          variant="outlined"
          type="tel"
          name="expiry"
          placeholder="Valid Thru"
          required
          margin="normal"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <TextField
          variant="outlined"
          type="tel"
          name="cvc"
          placeholder="CVC"
          required
          margin="normal"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default PayCard;
