import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderDetailsForm.css';

const statesInIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

const freightTypes = [
  { type: "Road Freight", basePrice: 2000, perKmPrice: 8 },
  { type: "Ocean Freight", basePrice: 1500, perKmPrice: 5 },
  { type: "Air Freight", basePrice: 3000, perKmPrice: 10 }
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;

const RATE_PER_KG = 100; // Rs. 100 per kg

// Mock distance map (distances in km)
const distanceMap = {
  "Andhra Pradesh": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Arunachal Pradesh": { "Andhra Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Assam": { "Arunachal Pradesh": 2900, "Andhra Pradesh": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Bihar": { "Arunachal Pradesh": 2900, "Assam": 2700, "Andhra Pradesh": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Chhattisgarh":{ "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Andhra Pradesh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Goa": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Andhra Pradesh": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Gujarat": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Andhra Pradesh": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Haryana":{ "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Andhra Pradesh": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Himachal Pradesh": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Andhra Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Jharkhand": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Andhra Pradesh": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Karnataka": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Andhra Pradesh": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Kerala": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Andhra Pradesh": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Madhya Pradesh": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Andhra Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Maharashtra":{ "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Andhra Pradesh": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Manipur": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Andhra Pradesh": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Meghalaya": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Andhra Pradesh": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Mizoram": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Andhra Pradesh": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Nagaland": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Andhra Pradesh": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Odisha": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Andhra Pradesh": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Punjab": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Andhra Pradesh": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Rajasthan":{ "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Andhra Pradesh": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Sikkim": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Andhra Pradesh": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Tamil Nadu": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Andhra Pradesh": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Telangana": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Andhra Pradesh": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Tripura": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Andhra Pradesh": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Uttar Pradesh": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Andhra Pradesh": 1700, "Uttarakhand": 2100, "West Bengal": 1500 },
  "Uttarakhand": { "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Andhra Pradesh": 2100, "West Bengal": 1500 },
  "West Bengal":{ "Arunachal Pradesh": 2900, "Assam": 2700, "Bihar": 1600, "Chhattisgarh": 1200, "Goa": 950, "Gujarat": 1800, "Haryana": 2000, "Himachal Pradesh": 2400, "Jharkhand": 1200, "Karnataka": 600, "Kerala": 1100, "Madhya Pradesh": 1500, "Maharashtra": 1000, "Manipur": 3200, "Meghalaya": 3100, "Mizoram": 3400, "Nagaland": 3300, "Odisha": 900, "Punjab": 2300, "Rajasthan": 1900, "Sikkim": 2600, "Tamil Nadu": 600, "Telangana": 300, "Tripura": 3300, "Uttar Pradesh": 1700, "Uttarakhand": 2100, "Andhra Pradesh": 1500 }
};

const OrderDetailsForm = () => {
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState({
    senderEmail: '',
    senderPhone: '',
    senderOrigin: 'India',
    senderAddress: '',
    receiverName: '',
    receiverLastName: '',
    receiverEmail: '',
    receiverPhone: '',
    receiverDestination: 'India',
    receiverAddress: '',
    shipmentItems: [{ commodity: '', weight: '' }],
    expectedDeliveryDate: '',
    freight: '',
  });

  const [errors, setErrors] = useState({});
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [distance, setDistance] = useState(0);

  const validate = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'senderEmail':
      case 'receiverEmail':
        if (!emailRegex.test(value)) {
          newErrors[name] = 'Invalid email format';
        } else {
          delete newErrors[name];
        }
        break;

      case 'senderPhone':
      case 'receiverPhone':
        if (!phoneRegex.test(value)) {
          newErrors[name] = 'Invalid phone number';
        } else {
          delete newErrors[name];
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
    validate(name, value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  };

  const handleShipmentItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...orderDetails.shipmentItems];
    updatedItems[index][name] = value;

    setOrderDetails({
      ...orderDetails,
      shipmentItems: updatedItems,
    });

    calculateTotalWeight(updatedItems);
  };

  const addShipmentItem = () => {
    setOrderDetails({
      ...orderDetails,
      shipmentItems: [...orderDetails.shipmentItems, { commodity: '', weight: '' }],
    });
  };

  const calculateTotalWeight = (shipmentItems) => {
    const totalWeight = shipmentItems.reduce((total, item) => total + parseFloat(item.weight || 0), 0);
    setTotalWeight(totalWeight);
  };

  const calculateDistance = (origin, destination) => {
    if (origin === destination) {
      return 0; // minimal distance for the same location
    }
    return (distanceMap[origin] && distanceMap[origin][destination]) || 0; // return distance or 0 if not found
  };

  const calculateTotalPrice = () => {
    const weightPrice = totalWeight * RATE_PER_KG;

    const freightType = freightTypes.find(freight => freight.type === orderDetails.freight);
    const freightPrice = freightType ? freightType.basePrice : 0;

    const calculatedDistance = calculateDistance(orderDetails.senderOrigin, orderDetails.receiverDestination);
    setDistance(calculatedDistance);

    const distancePrice = calculatedDistance * (freightType ? freightType.perKmPrice : 0);

    setTotalPrice(weightPrice + freightPrice + distancePrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [totalWeight, orderDetails.freight, orderDetails.senderOrigin, orderDetails.receiverDestination]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (Object.keys(errors).length === 0) {
  //     const orders = JSON.parse(localStorage.getItem('orders')) || [];
  //     localStorage.setItem('orders', JSON.stringify([...orders, { ...orderDetails, totalPrice, distance, assigned: false }]));
      
  //     // Pass orderDetails to the summary page
  //     navigate('/payment', { state: { orderDetails, totalPrice, distance } });
  //   } else {
  //     alert('Please fix the errors before submitting.');
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Prevent default form submission

  //   // Perform final validation before submission
  //   if (Object.keys(errors).length === 0) {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/orders', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(orderDetails),
  //       });
        

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       console.log('Order created successfully:', data);
  //       alert("Order submitted successfully!")
  //       // Navigate to the payment page with order details
  //       navigate('/order-summary', { state: { orderDetails, totalPrice, distance } });
  //     } catch (error) {
  //       console.error('Error creating order:', error);
  //       alert('An error occurred while creating the order. Please try again.');
  //     }
  //   } else {
  //     alert('Please fix the errors before submitting.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
        try {
            const response = await fetch('http://localhost:8080/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
             alert("Order submitted successfully!");

            // Navigate to the payment page with the orderId
            navigate('/payment');
        } catch (error) {
            console.error('Error creating order:', error);
            alert('An error occurred while creating the order. Please try again.');
        }
    } else {
        alert('Please fix the errors before submitting.');
    }
};

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="order-details-form">
      <h2>Booking</h2>
      <form onSubmit={handleSubmit}>
        <h3>Sender Details</h3>
        <div>
          <label htmlFor="senderEmail">Email:</label>
          <input
            type="email"
            id="senderEmail"
            name="senderEmail"
            value={orderDetails.senderEmail}
            onChange={handleChange}
            required
          />
          {errors.senderEmail && <span className="error">{errors.senderEmail}</span>}
        </div>
        <div>
          <label htmlFor="senderPhone">Phone Number:</label>
          <input
            type="text"
            id="senderPhone"
            name="senderPhone"
            value={orderDetails.senderPhone}
            onChange={handleChange}
            required
          />
          {errors.senderPhone && <span className="error">{errors.senderPhone}</span>}
        </div>
        <div>
          <label htmlFor="senderOrigin">Origin:</label>
          <select
            id="senderOrigin"
            name="senderOrigin"
            value={orderDetails.senderOrigin}
            onChange={handleChange}
            required
          >
            <option value="India">Select Origin</option>
            {statesInIndia.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="senderAddress">Sender Address:</label> {/* Added Sender Address field */}
          <input
            type="text"
            id="senderAddress"
            name="senderAddress"
            value={orderDetails.senderAddress}
            onChange={handleChange}
            required
          />
        </div>
        <h3>Receiver Details</h3>
        <div className="flex-row">
          <div>
            <label htmlFor="receiverName">First Name:</label>
            <input
              type="text"
              id="receiverName"
              name="receiverName"
              value={orderDetails.receiverName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="receiverLastName">Last Name:</label>
            <input
              type="text"
              id="receiverLastName"
              name="receiverLastName"
              value={orderDetails.receiverLastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="receiverEmail">Email:</label>
          <input
            type="email"
            id="receiverEmail"
            name="receiverEmail"
            value={orderDetails.receiverEmail}
            onChange={handleChange}
            required
          />
          {errors.receiverEmail && <span className="error">{errors.receiverEmail}</span>}
        </div>
        <div>
          <label htmlFor="receiverPhone">Phone Number:</label>
          <input
            type="text"
            id="receiverPhone"
            name="receiverPhone"
            value={orderDetails.receiverPhone}
            onChange={handleChange}
            required
          />
          {errors.receiverPhone && <span className="error">{errors.receiverPhone}</span>}
        </div>
        <div>
          <label htmlFor="receiverDestination">Destination:</label>
          <select
            id="receiverDestination"
            name="receiverDestination"
            value={orderDetails.receiverDestination}
            onChange={handleChange}
            required
          >
            <option value="India">Select Destination</option>
            {statesInIndia.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="receiverAddress">Receiver Address:</label> {/* Added Receiver Address field */}
          <input
            type="text"
            id="receiverAddress"
            name="receiverAddress"
            value={orderDetails.receiverAddress}
            onChange={handleChange}
            required
          />
        </div>
        <h3>Shipment Details</h3>
        {orderDetails.shipmentItems.map((item, index) => (
          <div key={index} className="shipment-item">
            <div>
              <label htmlFor={`commodity-${index}`}>Commodity:</label>
              <input
                type="text"
                id={`commodity-${index}`}
                name="commodity"
                value={item.commodity}
                onChange={(e) => handleShipmentItemChange(index, e)}
                required
              />
            </div>
            <div>
              <label htmlFor={`weight-${index}`}>Weight (kg):</label>
              <input
                type="number"
                id={`weight-${index}`}
                name="weight"
                value={item.weight}
                onChange={(e) => handleShipmentItemChange(index, e)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addShipmentItem}>Add More Items</button>

        <div>
          <label htmlFor="expectedDeliveryDate">Expected Delivery Date:</label>
          <input
            type="date"
            id="expectedDeliveryDate"
            name="expectedDeliveryDate"
            value={orderDetails.expectedDeliveryDate}
            onChange={handleDateChange}
            min={today}
            required
          />
        </div>

        <div>
          <label htmlFor="freight">Freight Type:</label>
          <select
            id="freight"
            name="freight"
            value={orderDetails.freight}
            onChange={handleChange}
            required
          >
            <option value="">Select Freight</option>
            {freightTypes.map((freight, index) => (
              <option key={index} value={freight.type}>{freight.type}</option>
            ))}
          </select>
        </div>

        <div className="total-price">
          <p>Total Weight: {totalWeight} kg</p>
          <p>Distance: {distance} km</p>
          <p>Total Price: Rs. {totalPrice}</p>
        </div>

        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
};

export default OrderDetailsForm;
