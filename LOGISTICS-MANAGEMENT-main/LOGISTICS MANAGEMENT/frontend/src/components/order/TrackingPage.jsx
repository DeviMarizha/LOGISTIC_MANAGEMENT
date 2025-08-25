// import React from 'react';
// import './TrackingPage.css';

// const trackingStages = [
//   "Shipping soon",
//   "Shipped",
//   "On the way",
//   "Out for delivery",
//   "Delivered"
// ];

// const TrackingPage = () => {
//   const currentStage = 0; // Set the current stage to the first stage

//   return (
//     <div className="tracking-page">
//       <h2>Order Tracking</h2>
//       <div className="tracking-bar">
//         {trackingStages.map((stage, index) => (
//           <div key={index} className={`stage ${index === currentStage ? 'active' : ''}`}>
//             <div className="stage-marker" />
//             <span className="stage-label">{stage}</span>
//           </div>
//         ))}
//       </div>
//       <table className="tracking-table">
//         <thead>
//           <tr>
//             <th>Stage</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {trackingStages.map((stage, index) => (
//             <tr key={index}>
//               <td>{stage}</td>
//               <td>
//                 {index === currentStage 
//                   ? 'In progress' 
//                   : 'Pending'}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TrackingPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './TrackingPage.css';

// const trackingStages = [
//   "Shipping soon",
//   "Shipped",
//   "On the way",
//   "Out for delivery",
//   "Delivered"
// ];

// const TrackingPage = () => {
//   const { orderId } = useParams(); // Extract orderId from URL params
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`);
//         setOrder(response.data);
//       } catch (error) {
//         console.error('Error fetching order details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!order) {
//     return <div>Order not found</div>;
//   }

//   const currentStage = order.currentStage; // Assuming `currentStage` is part of the order data

//   return (
//     <div className="tracking-page">
//       <div className="tracking-container">
//         <div className="order-section">
//           <div className="order-details">
//             <h3>Order {order.id}</h3>
//             <p><strong>Commodity:</strong> {order.shipmentItems[0].commodity}</p>
//             <p><strong>Origin:</strong> {order.senderOrigin}</p>
//             <p><strong>Destination:</strong> {order.receiverDestination}</p>
//             <p><strong>Total Price:</strong> Rs. {order.totalPrice}</p>
//             <p><strong>Driver Assigned:</strong> {order.driver ? 'Yes' : 'No'}</p>
//             {order.driver && (
//               <>
//                 <p><strong>Driver Name:</strong> {order.driver}</p>
//                 <p><strong>Vehicle:</strong> {order.vehicle}</p>
//                 <p><strong>Vehicle Number:</strong> {order.vehicleNumber}</p>
//                 <p><strong>Driver Contact:</strong> {order.driverContact}</p>
//               </>
//             )}
//           </div>
//         </div>
//         <div className="tracking-section">
//           <h2>Order Tracking</h2>
//           <div className="tracking-bar">
//             {trackingStages.map((stage, index) => (
//               <div key={index} className={`stage ${index === currentStage ? 'active' : ''}`}>
//                 <div className="stage-marker" />
//                 <span className="stage-label">{stage}</span>
//               </div>
//             ))}
//           </div>
//           <table className="tracking-table">
//             <thead>
//               <tr>
//                 <th>Stage</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {trackingStages.map((stage, index) => (
//                 <tr key={index}>
//                   <td>{stage}</td>
//                   <td>
//                     {index === currentStage 
//                       ? 'In progress' 
//                       : 'Pending'}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrackingPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TrackingPage.css';

const trackingStages = [
  "Shipping soon",
  "Shipped",
  "On the way",
  "Out for delivery",
  "Delivered"
];

const TrackingPage = () => {
  const { orderId } = useParams(); // Extract orderId from URL params
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  const currentStage = order.currentStage; // Assuming `currentStage` is part of the order data

  return (
    <div className="tracking-page">
      <div className="tracking-container">
        <div className="order-section">
          <div className="order-details">
            <h3>Order {order.id}</h3>
            <p><strong>Commodity:</strong> {order.shipmentItems[0].commodity}</p>
            <p><strong>Origin:</strong> {order.senderOrigin}</p>
            <p><strong>Destination:</strong> {order.receiverDestination}</p>
            {/* <p><strong>Total Price:</strong> Rs. {order.totalPrice}</p> */}
            <p><strong>Driver Assigned:</strong> {order.driver ? 'Yes' : 'No'}</p>
            {order.driver && (
              <>
                <p><strong>Driver Name:</strong> {order.driver}</p>
                <p><strong>Vehicle:</strong> {order.vehicle}</p>
                <p><strong>Vehicle Number:</strong> {order.vehicleNumber}</p>
                <p><strong>Driver Contact:</strong> {order.driverContact}</p>
              </>
            )}
          </div>
        </div>
        <div className="tracking-section">
          <h2>Order Tracking</h2>
          <div className="tracking-bar">
            {trackingStages.map((stage, index) => (
              <div
                key={index}
                className={`stage ${index <= currentStage ? 'active' : 'inactive'} ${index === 0 ? 'in-progress' : ''}`}
              >
                <div className="stage-marker" />
                <span className="stage-label">{stage}</span>
              </div>
            ))}
          </div>
          <table className="tracking-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {trackingStages.map((stage, index) => (
                <tr key={index}>
                  <td>{stage}</td>
                  <td>
                    {index === 0 
                      ? 'In progress' 
                      : (index <= currentStage ? 'Completed' : 'Pending')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;

