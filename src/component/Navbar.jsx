import React,{useContext} from 'react'
import axios from 'axios';
import { NavLink,useNavigate } from 'react-router-dom';
import {BsSpeedometer2} from 'react-icons/bs'
import {AiOutlinePlus,AiOutlineLogout} from 'react-icons/ai'
import {GiBookshelf} from 'react-icons/gi'
import {TokenForAll} from '../Context/GlobalContext'
const Navbar = () => {
  const { tokenAll,setTokenAll} = useContext(TokenForAll);
  const navigate=useNavigate();
  const logout = () => {
    navigate('/');
    setTokenAll("");
   
    const config= { headers: { authorization: tokenAll } };
    axios.post('https://techprime-5pt0.onrender.com/user/logout',config)
    .then(()=>{
      console.log("user Logged out");
       navigate('/');
      setTokenAll("");
    })
    .catch(e=>console.log(e));
    
  }
  return (
    <div className='relative '>
      <div 
        className='h-screen  w-16 flex justify-center flex-col items-center gap-3 max-sm:z-10 max-sm:rounded-full
        max-sm:flex-row max-sm:h-20 max-sm:w-full max-sm:justify-around max-sm:fixed max-sm:bottom-0 bg-slate-100 '>
        <NavLink to='/home'><BsSpeedometer2 className='text-3xl'/></NavLink>
        <NavLink to='/show'><GiBookshelf className='text-3xl'/></NavLink>
        <NavLink to='/create'><AiOutlinePlus className='text-3xl'/></NavLink>
        <button className='absolute bottom-4  max-sm:hidden text-3xl' ><AiOutlineLogout onClick={()=>logout()}/></button>
       
      </div>
      
    </div>
  )
}

export default Navbar;
