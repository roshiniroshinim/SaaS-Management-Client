import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 
  
  const handleLogin = async (e) => {
    e.preventDefault(); 
    navigate('/view')
};
    /*try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (res.data.success) {
       localStorage.setItem('user', JSON.stringify(res.data.user));
        setMessage('✅ Login Successful!');
        setTimeout(() => navigate('/view'), 1000);
     } else {
        setMessage('❌ ' + res.data.message);
      }
    } catch (err) {
      setMessage('❌ Server Error. Try again later.');
    }
  };*/

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="title">TenantHub</h2>
        <p className="subtitle">SaaS Tenant Management Platform</p>

       <form className="form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-footer">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="login-button">Sign in</button>
        </form>

        {message && <p className="demo-text">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
