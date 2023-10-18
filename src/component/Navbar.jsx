import React from 'react'
import { NavLink } from 'react-router-dom';
import {BsSpeedometer2} from 'react-icons/bs'
import {AiOutlinePlus,AiOutlineLogout} from 'react-icons/ai'
import {GiBookshelf} from 'react-icons/gi'

const Navbar = () => {
  return (
    <div className='relative '>
      <div 
        className='h-screen  w-16 flex justify-center flex-col items-center gap-3 max-sm:z-10 max-sm:rounded-full
        max-sm:flex-row max-sm:h-20 max-sm:w-full max-sm:justify-around max-sm:fixed max-sm:bottom-0 bg-slate-100'>
        <NavLink to='/'><BsSpeedometer2 className='text-3xl'/></NavLink>
        <NavLink to='/show'><GiBookshelf className='text-3xl'/></NavLink>
        <NavLink to='/create'><AiOutlinePlus className='text-3xl'/></NavLink>
        <button className='absolute bottom-4  max-sm:hidden text-3xl'><AiOutlineLogout /></button>
       
      </div>
      
    </div>
  )
}

export default Navbar;
