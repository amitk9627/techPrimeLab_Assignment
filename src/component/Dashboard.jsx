import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Logo from '../image/Logo.svg'
import { useNavigate } from 'react-router-dom'
import { TokenForAll } from '../Context/GlobalContext'
import { AiOutlineLogout } from 'react-icons/ai'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, } from "recharts";
const Dashboard = () => {
    const [allData, setAllData] = useState([]);
    const [closerIds, setCloserIds] = useState(0);
    const [totalCancelIds, setTotalCancelIds] = useState(0);
    const [totalClosedIds, setTotalClosedIds] = useState(0);
    const [totalProject, setTotalProject] = useState(0);
    const [totalRunningIds, setTotalRunningIds] = useState(0);

    const { tokenAll, setTokenAll } = useContext(TokenForAll);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://techprime-5pt0.onrender.com/project/dash')
            .then((res) => {
                setTotalClosedIds(res.data.totalClosedIds);
                setCloserIds(res.data.closerIds);
                setTotalCancelIds(res.data.totalCancelIds);
                setTotalProject(res.data.totalProject);
                setTotalRunningIds(res.data.totalRunningIds);
            })
            .catch(e => { console.log(e) })
    }, [])
    useEffect(() => {
        axios.get("https://techprime-5pt0.onrender.com/project/dashdept")
            .then((res) => setAllData(res.data))
            .catch(e => { console.log(e) })
    }, [])



    const logout = () => {
        navigate('/');
        setTokenAll("");
        const config = {
            headers: {
                authorization: tokenAll
            }
        };
        axios.post("https://techprime-5pt0.onrender.com/user/logout", config)
            .then((res) => {
                navigate('/');
                setTokenAll("");
            })
            .catch(e => console.log(e));
    }



    return (
        <div className='w-full relative h-full bg-blue-50  ml-16 max-sm:ml-0'>
            <div className='h-36 w-full relative flex justify-items-center background'>
                <span className='absolute top-7 left-4  text-white text-xl font-bold'>Dashboard</span>
                <img src={Logo} alt="logo" className=' h-12 m-auto max-sm:hidden' />
                <button className='absolute z-100 right-6 top-6 text-3xl text-white sm:hidden' onClick={() => logout(1)}><AiOutlineLogout /></button>
            </div>
            <div className='flex bg-transparent absolute top-32 max-sm:top-24 '>

                <div className='boxborder h-20 w-60 ml-6  bg-white pl-6 rounded-md max-sm:w-28 max-sm:ml-3 max-sm:pl-2 border-l-4 border-cyan-400'>
                    <p className='text-gray-600 mt-2 max-sm:text-sm'>Total Project</p>
                    <p className='text-3xl font-bold text-gray-700 '>{totalProject}</p>
                </div>

                <div className='boxborder  h-20 w-60 ml-6 bg-white  pl-6 rounded-md max-sm:w-28 max-sm:ml-3 max-sm:pl-2 border-l-4 border-cyan-400'>
                    <p className='text-gray-600 mt-2'>Total Running</p>
                    <p className='text-3xl font-bold text-gray-700'>{totalRunningIds}</p>
                </div>

                <div className='boxborder h-20 w-60 ml-6 bg-white  pl-6 rounded-md max-sm:w-28 max-sm:ml-3 max-sm:pl-2 border-l-4 border-cyan-400'>
                    <p className='text-gray-600 mt-2'>Total Close</p>
                    <p className='text-3xl font-bold text-gray-700'>{totalClosedIds}</p>
                </div>

                <div className='boxborder  h-20 w-60 ml-6 bg-white max-sm:hidden pl-6 rounded-md  max-sm:pl-2 border-l-4 border-cyan-400'>
                    <p className='text-gray-600 mt-2'>Closure Delay</p>
                    <p className='text-3xl font-bold text-gray-700'>{closerIds}</p>
                </div>



                <div className='boxborder  h-20 w-60 ml-6 bg-white max-sm:hidden pl-6 rounded-md  max-sm:pl-2 border-l-4 border-cyan-400'>
                    <p className='text-gray-600 mt-2'>Total Cancelled</p>
                    <p className='text-3xl font-bold text-gray-700'>{totalCancelIds}</p>
                </div>
            </div>
            <div className='ml-4 max-sm:ml-0'>
                <div className='mt-20 mb-20 text-xl font-bold max-sm:ml-3'><p>Department wise - Total vs Close</p></div>
                <div className='max-sm:mt-20 max-sm:-ml-2'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={allData}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 5,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="totalData"
                            fill="#8884d8"
                            barSize={15}
                            radius={[10, 10, 0, 0]}
                        />
                        <Bar
                            dataKey="totalClosed"
                            fill="#82ca9d"
                            barSize={15}
                            radius={[10, 10, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
