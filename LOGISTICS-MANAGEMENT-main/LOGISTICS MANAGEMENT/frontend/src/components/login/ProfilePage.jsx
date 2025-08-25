
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './ProfilePage.css';

const ProfilePage = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = "user@example.com"; // Replace with actual user email from auth context or state

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders?email=${userEmail}`);
        console.log(response.data);
        setUserOrders(response.data);
      } catch (error) {
        console.error('Error fetching user orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [userEmail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h2>Your Orders</h2>
      {userOrders.length > 0 ? (
        <div className="order-list">
          {userOrders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order {order.id}</h3>
              <p>Commodity: {order.shipmentItems[0].commodity}</p>
              <p>Origin: {order.senderOrigin}</p>
              <p>Destination: {order.receiverDestination}</p>
              {/* <p>Total Price: Rs. {order.totalPrice}</p> */}
              <p>Driver Assigned: {order.driver ? 'Yes' : 'No'}</p>
              {order.driver && (
                <>
                  <p>Driver Name: {order.driver}</p>
                  <p>Driver Contact: {order.driverContact}</p>
                  <p>Vehicle: {order.vehicle}</p>
                  <p>Vehicle Number: {order.vehicleNumber}</p>
                </>
              )}
              <Link to={`/orderdetails/${order.id}`} className="track-order-button">
                Track Order
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default ProfilePage;



