// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../login/Login.css'; // Assuming you have your CSS in this file

// const AdminLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Replace with your admin authentication logic
//     if (username === 'admin25' && password === 'password25') {
//       navigate('/admin-dashboard');
//     } else {
//       setError('*Invalid username or password*');
//     }
//   };

//   return (
//     <div id="login-box">
//       <h2 id="loginTitle">Admin Login</h2>
//       {error && <p id="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div id="user-box">
//           <input
//             type="text"
//             required
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <label>Username</label>
//         </div>
//         <div id="user-box">
//           <input
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <label>Password</label>
//         </div>
//         <button type="submit" id="loginBtn">Login</button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import based on your file structure
import '../login/Login.css'; // Assuming you have your CSS in this file

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your admin authentication logic
    if (username === 'admin25' && password === 'password25') {
      const user = { username, isAdmin: true }; // Assuming `isAdmin` is a boolean
      login(user);
      navigate('/admin-dashboard');
    } else {
      setError('*Invalid username or password*');
    }
  };

  return (
    <div id="login-box">
      <h2 id="loginTitle">Admin Login</h2>
      {error && <p id="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div id="user-box">
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
        </div>
        <div id="user-box">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <button type="submit" id="loginBtn">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
