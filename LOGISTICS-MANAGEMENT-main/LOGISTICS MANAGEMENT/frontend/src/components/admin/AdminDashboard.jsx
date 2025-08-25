// import React, { useState, useEffect } from 'react';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
//   const [driver, setDriver] = useState('');
//   const [vehicle, setVehicle] = useState('');
//   const [vehicleNumber, setVehicleNumber] = useState('');
//   const [driverContact, setDriverContact] = useState('');

//   useEffect(() => {
//     const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
//     setOrders(storedOrders);
//   }, []);

//   const handleOrderClick = (orderIndex) => {
//     setSelectedOrderIndex(orderIndex);
//     const selectedOrder = orders[orderIndex];
//     setDriver(selectedOrder.driver || '');
//     setVehicle(selectedOrder.vehicle || '');
//     setVehicleNumber(selectedOrder.vehicleNumber || '');
//     setDriverContact(selectedOrder.driverContact || '');
//   };

//   const handleAssignDriverVehicle = () => {
//     if (selectedOrderIndex !== null) {
//       const updatedOrders = [...orders];
//       const orderIndex = selectedOrderIndex;
//       updatedOrders[orderIndex] = { 
//         ...updatedOrders[orderIndex], 
//         driver, 
//         vehicle, 
//         vehicleNumber, 
//         driverContact, 
//         assigned: true 
//       };
//       setOrders(updatedOrders);
//       localStorage.setItem('orders', JSON.stringify(updatedOrders));
//       setSelectedOrderIndex(null); // Optionally close the detail view after assignment
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>
//       <div className="orders">
//         {orders.map((order, index) => (
//           <div
//             key={index}
//             className="order-card"
//             onClick={() => handleOrderClick(index)}
//           >
//             <h3>Order {index + 1}</h3>
//             <p>Commodity: {order.shipmentItems[0].commodity}</p>
//             <p>Origin: {order.senderOrigin}</p>
//             <p>Destination: {order.receiverDestination}</p>
//             {order.assigned && (
//               <>
//                 <p>Driver: {order.driver}</p>
//                 <p>Vehicle: {order.vehicle}</p>
//               </>
//             )}
//           </div>
//         ))}
//       </div>

//       {selectedOrderIndex !== null && (
//         <div className="order-details">
//           <h3>Order Details</h3>
//           <p>Email: {orders[selectedOrderIndex].senderEmail}</p>
//           <p>Phone: {orders[selectedOrderIndex].senderPhone}</p>
//           <p>Origin: {orders[selectedOrderIndex].senderOrigin}</p>

//           <h3>Receiver Details:</h3>
//           <p>Name: {orders[selectedOrderIndex].receiverName} {orders[selectedOrderIndex].receiverLastName}</p>
//           <p>Email: {orders[selectedOrderIndex].receiverEmail}</p>
//           <p>Phone: {orders[selectedOrderIndex].receiverPhone}</p>
//           <p>Destination: {orders[selectedOrderIndex].receiverDestination}</p>

//           <h3>Shipment Details:</h3>
//           {orders[selectedOrderIndex].shipmentItems.map((item, index) => (
//             <p key={index}>Commodity: {item.commodity}, Weight: {item.weight} kg</p>
//           ))}
//           <p>Expected Delivery Date: {orders[selectedOrderIndex].expectedDeliveryDate}</p>
//           <p>Freight Type: {orders[selectedOrderIndex].freight}</p>
//           <p>Total Price: Rs. {orders[selectedOrderIndex].totalPrice}</p>
//           <div>
//             <input
//               type="text"
//               placeholder="Driver Name"
//               value={driver}
//               onChange={(e) => setDriver(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Driver Contact"
//               value={driverContact}
//               onChange={(e) => setDriverContact(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Vehicle"
//               value={vehicle}
//               onChange={(e) => setVehicle(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Vehicle Number"
//               value={vehicleNumber}
//               onChange={(e) => setVehicleNumber(e.target.value)}
//             />
            
//           </div>
//           <button onClick={handleAssignDriverVehicle}>Assign Driver & Vehicle</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const [driver, setDriver] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [driverContact, setDriverContact] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = async (orderIndex) => {
    setSelectedOrderIndex(orderIndex);
    const selectedOrder = orders[orderIndex];
    setDriver(selectedOrder.driver || '');
    setVehicle(selectedOrder.vehicle || '');
    setVehicleNumber(selectedOrder.vehicleNumber || '');
    setDriverContact(selectedOrder.driverContact || '');
  };

  const handleAssignDriverVehicle = async () => {
    if (selectedOrderIndex !== null) {
      const updatedOrder = {
        ...orders[selectedOrderIndex],
        driver,
        vehicle,
        vehicleNumber,
        driverContact,
        assigned: true,
      };

      try {
        await axios.put(`http://localhost:8080/api/orders/${updatedOrder.id}`, updatedOrder);
        const updatedOrders = [...orders];
        updatedOrders[selectedOrderIndex] = updatedOrder;
        setOrders(updatedOrders);
        setSelectedOrderIndex(null);
      } catch (error) {
        console.error('Error updating order:', error);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="orders">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="order-card"
            onClick={() => handleOrderClick(index)}
          >
            <h3>Order {index + 1}</h3>
            <p>Commodity: {order.shipmentItems[0]?.commodity}</p>
            <p>Origin: {order.senderOrigin}</p>
            <p>Destination: {order.receiverDestination}</p>
            {order.assigned && (
              <>
                <p>Driver: {order.driver}</p>
                <p>Vehicle: {order.vehicle}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {selectedOrderIndex !== null && (
        <div className="order-details">
          <h3>Order Details</h3>
          <p>Email: {orders[selectedOrderIndex].senderEmail}</p>
          <p>Phone: {orders[selectedOrderIndex].senderPhone}</p>
          <p>Origin: {orders[selectedOrderIndex].senderOrigin}</p>

          <h3>Receiver Details:</h3>
          <p>Name: {orders[selectedOrderIndex].receiverName} {orders[selectedOrderIndex].receiverLastName}</p>
          <p>Email: {orders[selectedOrderIndex].receiverEmail}</p>
          <p>Phone: {orders[selectedOrderIndex].receiverPhone}</p>
          <p>Destination: {orders[selectedOrderIndex].receiverDestination}</p>

          <h3>Shipment Details:</h3>
          {orders[selectedOrderIndex].shipmentItems.map((item, index) => (
            <p key={index}>Commodity: {item.commodity}, Weight: {item.weight} kg</p>
          ))}
          <p>Expected Delivery Date: {orders[selectedOrderIndex].expectedDeliveryDate}</p>
          <p>Freight Type: {orders[selectedOrderIndex].freight}</p>
          {/* <p>Total Price: Rs. {orders[selectedOrderIndex].totalPrice}</p> */}
          <div>
            <input
              type="text"
              placeholder="Driver Name"
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
            />
            <input
              type="text"
              placeholder="Driver Contact"
              value={driverContact}
              onChange={(e) => setDriverContact(e.target.value)}
            />
            <input
              type="text"
              placeholder="Vehicle"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
          </div>
          <button onClick={handleAssignDriverVehicle}>Assign Driver & Vehicle</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
