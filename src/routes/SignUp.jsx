import React, { useState } from 'react'
import axios from 'axios'
import Logo from '../image/Logo.svg'
import { Button, } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    const body = {
      email: email,
      password: password
    };
    axios.post('https://techprime-5pt0.onrender.com/user/register', body, { headers: {} })
      .then((res) => {
        console.log("user registered");
        navigate('/')
      })
      .catch(e => console.log(e))
  }

  return (
    <div className='h-screen w-screen bg-gradient-to-t from-white to-sky-900 flex items-center justify-center'>

      <div>
        <img alt='techprimelabs' src={Logo} className='w-28 mb-4 max-sm:w-24 m-auto' />
        <div className='bg-white p-12 m-2 rounded-lg'>
          <p className='text-center text-gray-600'>Sign Up to get started</p>
          <div className='my-4'>
            <p className='my-1'>Email</p>
            <input type='text' className='bg-gray-100 h-10 w-64' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='my-4'>
            <p className='my-1'>Password</p>
            <input type='password' className='bg-gray-100 h-10 w-64' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='text-center'>
            <Button variant="contained" className='w-full' onClick={handleSignup}> Signup</Button>
          </div>
          <p className='mt-3 text-center'> Already Account ? <NavLink to='/' className='text-blue-500'>Login</NavLink></p>
        
          
        </div>
      </div>

    </div>
  )
}

export default SignUp
