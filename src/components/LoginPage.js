import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'
import Cookies from 'js-cookie';

function LoginPage() {
    const navigate = useNavigate()
    
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    
    async function handleSubmit(e) {
        e.preventDefault()
        console.log(email)
        console.log(password)
        
        const request = await axios.post("http://localhost:3001/login/auth-login",{password:password,email:email} )
        console.log(`key: ${request.data.accessToken}`);
        Cookies.set('apiKey', request.data.accessToken);
        

        if (request.data.accessToken != null){
          navigate('/user-page', {state: {
            email:email
          }}
  
          )
        }
        else{
          console.log("Didnt navigate");
        }
        
        
    }
    function NavigateSignup () {
        navigate('/Signup')
    }
  return (

    <div className='App'>
    <div className='auth-form'>
        <h2>Login</h2>
       <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='Your email' id='email'  />
            <label htmlFor="password">Password</label>
            <input value={password} type="password"onChange={(e)=>{setPassword(e.target.value)}} placeholder='*******' id='password' name='password' />
            <button type='submit'>Log In</button>
        </form>
        <button  className='link-btn' onClick={NavigateSignup}>Don't have an account? Register here.</button>
    </div>
    </div>
  )
}

export default LoginPage