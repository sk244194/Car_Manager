import React, { useState } from "react";
import './signup.css';  // Use plain CSS import
import axios from "axios";
import {Link} from 'react-router-dom';


function SignUp() {
    const [data, setData] = useState({ email: '', password: '' });

    function handleChange(event) {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', data);
            alert(res.data);
        } catch (error) {
            alert(error.response?.data?.error || 'Signup failed');
        }
    };

    return (
        <div className="Sign">
            <h1>Sign Up</h1>
            <div className="container">
                <form className="SignUp" onSubmit={handleSubmit}>
                    <input 
                        name='email' 
                        type="email" 
                        placeholder="Email" 
                        value={data.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        name='password' 
                        type="password" 
                        placeholder="Password" 
                        value={data.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <button id="Sign" type="submit">Sign Up</button>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
