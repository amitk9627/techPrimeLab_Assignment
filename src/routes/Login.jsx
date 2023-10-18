import React, { useState, useContext } from 'react'
import Logo from '../image/Logo.svg'
import { Button, } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TokenForAll } from '../Context/GlobalContext'

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false)

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { setTokenAll } = useContext(TokenForAll);
  const navigate = useNavigate();

  //regex 
  function validateEmail(email) {
    const regex = /^(([A-Za-z0-9._%+-]{3,})+@([a-z0-9.-]{3,})+\.[a-z]{2,3})$/i;
    return regex.test(email);
  }
  const handleLogin = () => {
   
    const body = {
      email: "",
      password: ""
    }
    if (email && validateEmail(email)) {
      body.email = email;
      setEmailError(false)
    } else { setEmailError(true) }

    if (password && password.length >= 6 && password.length <= 12) {
      body.password = password;
      setPasswordError(false);
    } else {
      setPasswordError(true)
    }

    if (body.email && body.password) {


      axios.post("https://techprime-5pt0.onrender.com/user/login", body, { headers: {} })
        .then((res) => {
          setTokenAll(res.data.token);
          setEmailError(false);
          setPasswordError(false)
          navigate('/home')
        })
        .catch(e => {
          console.log(e);
          setEmailError(true);
          setPasswordError(true);
        })
    }
  }

  return (
    <div className='h-screen w-screen bg-gradient-to-t from-white to-sky-900 flex items-center justify-center'>

      <div className='flex flex-col max-sm:justify-between'>
        <img alt='techprimelabs' src={Logo} className='w-28 mb-4 max-sm:w-24 m-auto' />
        <div className='bg-white p-12 m-2 rounded-lg'>
          <p className='text-center text-gray-600'>Login to get started</p>

          <div className='my-4'>
            <p className='my-1'>Email</p>
            <input type='text' className='bg-gray-100 h-10 w-64' onChange={(e) => setEmail(e.target.value)} />
            {emailError && <p className='text-sm text-red-500'>email is invalid</p>}
          </div>

          <div className='my-4'>
            <p className='my-1'>Password</p>
            <input type='password' className='bg-gray-100 h-10 w-64' onChange={(e) => setPassword(e.target.value)} />
            {passwordError && <p className='text-sm text-red-500'>password should be in range 6 and 12</p>}
          </div>

          <div className='text-center'>
            <Button variant="contained" className='w-full' onClick={() => handleLogin()}> Login</Button>
          </div>
          <p className='mt-3 text-center'> New User ? <NavLink to='/signup' className='text-blue-500'>Sign up</NavLink></p>
        </div>
      </div>

    </div>
  )
}

export default Login
