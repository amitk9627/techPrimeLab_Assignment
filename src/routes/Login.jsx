import React, { useState, useContext } from 'react'
import Logo from '../image/Logo.svg'
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
    <div className='h-screen w-screen relative flex items-center justify-center logback'>
      
       
        <div className='flex flex-col max-sm:justify-between items-center absolute z-10 max-sm:w-full bg-transparent'>
          
            <img alt='techprimelabs' src={Logo} className='w-24 mb-4 max-sm:w-24 m-auto' />
            <p className='text-center text-gray-200 max-sm:text-gray-800 mb-4'>Online Project Management</p>
          
          <div className='bg-white p-12  rounded-lg shadow-2xl max-sm:shadow-none '>
            <p className='text-center text-gray-500 text-xl'>Login to get started</p>

            <div className='mt-4 max-sm:mt-8'>
              <p className='my-1 text-sm'>Email</p>
              <input type='text' className='bg-gray-100 pl-2 text-xl h-12 w-72 border border-gray-400 rounded-lg ' onChange={(e) => setEmail(e.target.value)} />

              {emailError && <p className='text-sm text-red-500'>email is invalid</p>}
            </div>

            <div className='mt-4 max-sm:mt-8'>
              <p className='my-1 text-sm'>Password</p>
              <input type='password' className='bg-gray-100 pl-2 text-xl h-12 w-72  border border-gray-400 rounded-lg' onChange={(e) => setPassword(e.target.value)} />
              {passwordError && <p className='text-sm text-red-500'>password should be in range 6 and 12</p>}
            </div>
            <p className='text-blue-600 text-right mt-1 pr-2'>
              Forget password?
            </p>

            <div className='text-center mt-8'>
              <button className='logbutton' onClick={() => handleLogin()}> Login</button>
            </div>
            <p className='mt-3 text-center'> New User ? <NavLink to='/signup' className='text-blue-500'>Sign up</NavLink></p>
          </div>
        </div>

      </div>
  )
}

export default Login

/*

*/