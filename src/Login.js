import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "../utils/axios";
import { useUser } from "../components/UserContext";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isLogin } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false);
      }, 3000); // loading time
  
      return () => clearTimeout(timer);
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: API integration here
    try {
      const res = await axios.post('/user/login', { email, password } )
      localStorage.setItem('token', res.data.token);
      isLogin(res.data.user);
      navigate('/dashboard');
    } catch(err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
    // console.log('Login with:', "email: " + email, "pass: " + password);
  };

  if (loading) return <Loading />;

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">TenantHub</h2>
        <p className="login-subtitle">SaaS Tenant Management Platform</p>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label>Email </label>
            <input type="email" placeholder="Enter your email" value={email} required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label>Password </label>
            <input type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="login-options">
            <label>
              <input type="checkbox" required /> Remember me
            </label>
            <Link href="/" className="forgot-link">Forgot password?</Link>
          </div>
          <button type="submit" className='submit-button'>Sign in</button>
          <p className="demo-info">Demo: Use any email/password</p>
        </form>
      </div>
    </div>
  );
};

export default Login;