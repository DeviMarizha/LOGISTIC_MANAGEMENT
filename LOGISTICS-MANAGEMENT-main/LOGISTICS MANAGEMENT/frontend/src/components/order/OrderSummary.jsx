import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderSummary.css';

const OrderSummary = () => {
  const location = useLocation();
  const { orderDetails, totalPrice, driverDetails, vehicleDetails } = location.state || {};

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <p><strong>Order Placed Successfully!</strong></p>
      <div className="order-details">
        <h3>Sender Details:</h3>
        <p>Email: {orderDetails?.senderEmail}</p>
        <p>Phone: {orderDetails?.senderPhone}</p>
        <p>Origin: {orderDetails?.senderOrigin}</p>

        <h3>Receiver Details:</h3>
        <p>Name: {orderDetails?.receiverName} {orderDetails?.receiverLastName}</p>
        <p>Email: {orderDetails?.receiverEmail}</p>
        <p>Phone: {orderDetails?.receiverPhone}</p>
        <p>Destination: {orderDetails?.receiverDestination}</p>

        <h3>Shipment Details:</h3>
        {orderDetails?.shipmentItems?.map((item, index) => (
          <p key={index}>Commodity: {item.commodity}, Weight: {item.weight} kg</p>
        ))}
        <p>Expected Delivery Date: {orderDetails?.expectedDeliveryDate}</p>
        <p>Freight Type: {orderDetails?.freight}</p>
        {/* <p>Total Price: Rs. {orderDetails?.totalPrice}</p> */}
      </div>
      <div className="track-order">
        <Link to="/payment" className="track-order-button">Proceed Payment</Link>
      </div>
    </div>
  );
};

export default OrderSummary;
