import React,{useState} from 'react'
import { Button, } from '@mui/material';
import { NavLink } from 'react-router-dom';
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className='h-screen w-screen bg-gradient-to-t from-sky-900 to-white flex items-center justify-center'>

      <div>
        <img alt='techprimelabs' src='https://techprimelab.com/wp-content/uploads/2020/07/tpl-logo.png' className='w-96 mb-4' />
        <div className='bg-white p-12 m-2 rounded-lg'>
          <p className='text-center'>Sign Up to get started</p>
          <div className='my-4'>
            <p className='my-1'>Email</p>
            <input type='text' className='bg-gray-100 h-10 w-64' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='my-4'>
            <p className='my-1'>Password</p>
            <input type='password' className='bg-gray-100 h-10 w-64' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='text-center'>
            <Button variant="contained" className='w-full'> Signup</Button>
          </div>
          <NavLink to='/log'>Login</NavLink>
        </div>
      </div>

    </div>
  )
}

export default SignUp
