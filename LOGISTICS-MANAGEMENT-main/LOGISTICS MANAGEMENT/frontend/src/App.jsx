// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './components/redux/store';
// import Navbar from './components/navbar/Navbar';
// import Home from './components/home/Home';
// import About from './components/about/About';
// import Login from './components/login/Login';
// import AdminLogin from './components/admin/AdminLogin';
// import AdminDashboard from './components/admin/AdminDashboard';
// import Footer from './components/footer/Footer';
// import FaqPage from './components/faq/FaqPage';
// import Signup from './components/signup/Signup';
// import Layout from './components/layout/Layout';
// import OrderDetailsForm from './components/order/OrderDetailsForm';
// import TrackingPage from './components/order/TrackingPage';
// import OrderSummary from './components/order/OrderSummary';
// import PaymentPage from './components/order/PaymentPage';
// import ProfilePage from './components/login/ProfilePage';
// import { AuthProvider } from './components/admin/AuthContext';
// import PrivateRoute from './components/admin/PrivateRoute';

// function App() {
//   const [values, setValues] = useState({ email: '', password: '', name: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Get navigate function

//   const handleLogin = (event) => {
//     event.preventDefault();
//     // Handle login logic
//     console.log('Logging in with:', values);
//     // Redirect to OrderDetailsForm on successful login
//     navigate('/order');
//   };

//   const handleSignup = (event) => {
//     event.preventDefault();
//     // Handle signup logic
//     console.log('Signing up with:', values);
//     // Redirect to OrderDetailsForm on successful signup
//     navigate('/order');
//   };

//   return (
//     <div className="App">
//       <AuthProvider>
//       <Provider store={store}>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Layout />} />
//           <Route index element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/faq" element={<FaqPage />} />
//           <Route 
//             path="/login" 
//             element={<Login handleLogin={handleLogin} setValues={setValues} values={values} error={error} />} 
//           />
//           <Route path="/adminlogin" element={<AdminLogin />} />
//           {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
//           <Route element={<PrivateRoute />}>
//             <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           </Route>
//           <Route 
//             path="/signup" 
//             element={<Signup handleSignup={handleSignup} setValues={setValues} values={values} error={error} />} 
//           />
//           <Route path="/order" element={<OrderDetailsForm />} />
//           <Route path="/order-summary" element={<OrderSummary />} />
//           <Route path="/orderdetails" element={<TrackingPage/>} />
//           <Route path="/profile" element={<ProfilePage/>}/>
//           <Route path="/payment" element={<PaymentPage />} />
//         </Routes>
//         <Footer />
//       </Provider>
//       </AuthProvider>
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import About from './components/about/About';
import Login from './components/login/Login';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import Footer from './components/footer/Footer';
import FaqPage from './components/faq/FaqPage';
import Signup from './components/signup/Signup';
import Layout from './components/layout/Layout';
import OrderDetailsForm from './components/order/OrderDetailsForm';
import TrackingPage from './components/order/TrackingPage';
import OrderSummary from './components/order/OrderSummary';
import PaymentPage from './components/order/PaymentPage';
import ProfilePage from './components/login/ProfilePage';
import PrivateRoute from './components/admin/PrivateRoute';
import Payment from './components/order/Payment';
import PayCard from './components/order/PayCard';
import SuccessPage from './components/order/SuccessPage';

function App() {
  const [values, setValues] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Get navigate function

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic
    console.log('Logging in with:', values);
    // Redirect to OrderDetailsForm on successful login
    navigate('/order');
  };

  const handleSignup = (event) => {
    event.preventDefault();
    // Handle signup logic
    console.log('Signing up with:', values);
    // Redirect to OrderDetailsForm on successful signup
    navigate('/order');
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route 
            path="/login" 
            element={<Login handleLogin={handleLogin} setValues={setValues} values={values} error={error} />} 
          />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
          <Route 
            path="/signup" 
            element={<Signup handleSignup={handleSignup} setValues={setValues} values={values} error={error} />} 
          />
          <Route path="/order" element={<OrderDetailsForm />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/orderdetails" element={<TrackingPage />} />
          <Route path="/orderdetails/:orderId" element={<TrackingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* <Route path="/payment" element={<PaymentPage />} /> */}
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/paycard" element={<PayCard/>}/>
          {/* <Route path="/upi" element={<Upi/>}/> */}
          <Route path="/success" element={<SuccessPage/>}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
