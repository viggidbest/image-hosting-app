import React from 'react'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
// import '../styles/Signup.css'
import axios from 'axios'
import {Helmet} from 'react-helmet';
function SignupPage() {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const[name,setName] = useState("")

   async function  handleSubmit(e) {
        e.preventDefault()
        console.log(name)
        console.log(password);
        const response= await axios.post("http://localhost:3001/signup/auth-signup",{name:name,password:password,email:email} ).then(res=>console.log(res))
    }
    function navigateLogin () {
        navigate('/login')
    }
  return (
    <div className='App'>
      <Helmet>
        <link rel="stylesheet" href="login.css" />
      </Helmet>
    <div className='auth-form'>
         <h2>Signup</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
            <input onChange={(e)=>{setName(e.target.value)}} value={name} placeholder='Enter your Full name' id='name' name='email' />
            <label htmlFor="email">email</label>
            <input onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='Your email' id='email' name='email' />
            <label htmlFor="password">Password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}}type="password" placeholder='*******' id='password' name='password' />
            <button type='submit'>Submit</button>
        </form>
        <button className='link-btn' onClick={navigateLogin}>Already have an account? Login here.</button>
    </div>
    </div>
  )
}

export default SignupPage