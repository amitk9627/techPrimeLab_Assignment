import React, { useState } from 'react'
import axios from 'axios'
import Logo from '../image/Logo.svg'
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
    <div className='h-screen w-screen flex items-center justify-center logback'>

      <div className='flex flex-col max-sm:justify-between absolute z-10 max-sm:w-full'>
        <img alt='techprimelabs' src={Logo} className='w-24 mb-4 max-sm:w-24 m-auto' />
        <p className='text-center text-gray-200 mb-4 max-sm:text-black'>Online Project Management</p>
        <div className='bg-white p-12 m-2 rounded-lg shadow-2xl max-sm:shadow-none max-sm:m-0'>
          <p className='text-center text-gray-600 text-xl'>Signup to get started</p>

          <div className='mt-4 max-sm:mt-8'>
            <p className='my-1 text-sm'>Email</p>
            <input type='text' className='bg-gray-100 h-12 pl-2 text-xl border border-gray-400 rounded-lg w-72' onChange={(e) => setEmail(e.target.value)} />

          </div>

          <div className='mt-4 max-sm:mt-8'>
            <p className='my-1 text-sm'>Password</p>
            <input type='password' className='bg-gray-100 pl-2 text-xl h-12 border border-gray-400 rounded-lg w-72' onChange={(e) => setPassword(e.target.value)} />

          </div>

          <div className='text-center mt-8'>
            <button className='logbutton' onClick={() => handleSignup()}> Sign in</button>
          </div>
          <p className='mt-3 text-center'> Already account ? <NavLink to='/' className='text-blue-500'>Login </NavLink></p>
        </div>
      </div>

    </div>
  )
}

export default SignUp
