import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', data);
      alert(res.data);
    } catch (error) {
      alert(error.response?.data?.error || 'Wrong Credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
