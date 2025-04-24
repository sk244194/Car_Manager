import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', data);
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/imageUpload');
    } catch (error) {
      alert(error.response?.data?.error || 'Wrong Credentials');
    }
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <input 
            name="email" 
            type="email" 
            placeholder="Enter Email" 
            value={data.email} 
            onChange={handleChange} 
            required 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            value={data.password} 
            onChange={handleChange} 
            required 
          />
          <button id="LoginBtn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
