import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Logo from '../image/Logo.svg'
import { useNavigate } from 'react-router-dom'
import { TokenForAll } from '../Context/GlobalContext'
import { AiOutlineLogout } from 'react-icons/ai'
import BarChart from './BarChart'
const Dashboard = () => {
    const [allData, setAllDate] = useState([]);
    const { tokenAll,setTokenAll } = useContext(TokenForAll);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://techprime-5pt0.onrender.com/project/dash')
            .then((res) => {
                setAllDate(res?.data?.alldata);
                
            })
            .catch(e => { console.log(e) })
    }, [])
    const register = allData.filter((item) => item['status'] === 'Register');
    const close = allData.filter((item) => item['status'] === 'Close');
    const running = allData.filter((item) => item['status'] === 'Running');
    const cancelled = allData.filter((item) => item['status'] === 'Cancelled');
    const logout = () => {
        navigate('/');
        setTokenAll("");
        const config={
            headers:{
                authorization: tokenAll
            }
        };
        axios.post("https://techprime-5pt0.onrender.com/user/logout",  config)
            .then((res) => {
                navigate('/');
                setTokenAll("");
            })
            .catch(e => console.log(e));
    }

    const [userData, satUserData] = useState({
        labels: ['STR', 'FIN', 'QLT', 'MNT', 'HR'],
        datasets: [
            {
                label: "Total",
                data: [19, 7, 9, 15, 5, 10],
                backgroundColor: ["blue"]
            },
            {
                label: "Close",
                data: [14, 6, 8, 15, 5, 9],
                backgroundColor: ["green"]
            }
        ]
    })

    return (
        <div className='w-full relative h-full bg-blue-50  ml-16 max-sm:ml-0'>
            <div className='h-36 w-full relative flex justify-items-center background'>
                <span className='absolute top-7 left-4  text-white text-xl font-bold'>Dashboard</span>
                <img src={Logo} alt="logo" className=' h-12 m-auto max-sm:hidden' />
                <button className='absolute z-100 right-6 top-6 text-3xl text-white sm:hidden' onClick={() => logout(1)}><AiOutlineLogout /></button>
            </div>
            <div className='flex  bg-transparent absolute top-32 max-sm:top-24 '>

                <div className='boxborder h-20 w-52 ml-6  bg-white pl-6 rounded-md max-sm:w-28 max-sm:ml-3 max-sm:pl-2'>
                    <p className='text-gray-600 mt-2 max-sm:text-sm'>Total projects</p>
                    <p className='text-3xl font-bold text-gray-700 '>{allData.length}</p>
                </div>

                <div className='boxborder  h-20 w-52 ml-6 bg-white max-sm:hidden pl-6 rounded-md  max-sm:pl-2'>
                    <p className='text-gray-600 mt-2'>Total Register</p>
                    <p className='text-3xl font-bold text-gray-700'>{register.length}</p>
                </div>

                <div className='boxborder  h-20 w-52 ml-6 bg-white  pl-6 rounded-md max-sm:w-28 max-sm:ml-3 max-sm:pl-2'>
                    <p className='text-gray-600 mt-2'>Total Running</p>
                    <p className='text-3xl font-bold text-gray-700'>{running.length}</p>
                </div>

                <div className='boxborder h-20 w-52 ml-6 bg-white  pl-6 rounded-md max-sm:w-28 max-sm:ml-3 max-sm:pl-2'>
                    <p className='text-gray-600 mt-2'>Total Close</p>
                    <p className='text-3xl font-bold text-gray-700'>{close.length}</p>
                </div>

                <div className='boxborder  h-20 w-52 ml-6 bg-white max-sm:hidden pl-6 rounded-md  max-sm:pl-2'>
                    <p className='text-gray-600 mt-2'>Total Cancelled</p>
                    <p className='text-3xl font-bold text-gray-700'>{cancelled.length}</p>
                </div>
            </div>
            <div className='ml-4'>
                <div className='mt-20 text-xl font-bold'><p>Department wise - Total vs Close</p></div>
                <BarChart chartData={userData} />
            </div>
        </div>
    )
}

export default Dashboard
