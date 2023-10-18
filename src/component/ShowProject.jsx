import React, { useEffect, useState,useContext } from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios';
import Logo from '../image/Logo.svg'
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavigate} from 'react-router-dom'
import { TokenForAll } from '../Context/GlobalContext'
const ShowProject = () => {
  const [allProject, setAllproject] = useState([]);
  const [bool, setBoolean] = useState(false);
  const { tokenAll} = useContext(TokenForAll);
    const navigate=useNavigate();
  useEffect(() => {
    (async () => {
      const res = await fetch('https://techprime-5pt0.onrender.com/project/getProject');
      const data = await res.json();
      setAllproject(data.allprojects)
    })()
  }, [])
  useEffect(() => {
    (async () => {
      const res = await fetch('https://techprime-5pt0.onrender.com/project/getProject');
      const data = await res.json();
      setAllproject(data.allprojects)
    })()
  }, [bool])

  const handleButton = (id, str) => {
    setBoolean(!bool);
    const body = {
      projectId: id,
      str: str
    }
    axios.patch("https://techprime-5pt0.onrender.com/project/getProject/" + id, body, { header: {} })
      .then(response => {
        console.log();
      })
      .catch(err => {
        console.log(err);
      })
  }
  const logout = () => {
    axios.post('https://techprime-5pt0.onrender.com/user/logout', { headers: { authorization: tokenAll } })
    .then((res)=>{
      console.log(res);
      navigate('/')
    })
    .catch(e=>console.log(e));
  }



  return (
    <div className='flex'>

      <Navbar />

      <div className='w-full'>
        <div className=' h-20 w-full relative flex justify-items-center background'>
          <span className='absolute top-7 left-4  text-white text-xl font-bold'>Project Listing</span>
          <img src={Logo} alt="logo" className=' h-12 m-auto max-sm:hidden' />
          <button className='absolute z-100 right-6 top-6 text-3xl text-white sm:hidden' onClick={()=>logout()}><AiOutlineLogout /></button>
        </div>
        <div className='w-full'>

          <div className='sm:hidden m-4'>
            {
              allProject.map((item, i) => 
                <div className='h-72  rounded-xl max-sm:mb-5 max-sm:shadow-lg' key={i}>
                  <div className='p-3 text-xl flex justify-between gap-4'>
                    <div>
                      <p className='font-semibold'>{item.projectName}</p>
                      <span className='text-xs'>{item.startDate} to {item.endDate}</span>
                    </div>
                    <div>{item.status}</div>
                  </div>
                  <div className='p-2 pl-4'>
                    <p> <span className='text-gray-500'>Reason </span>: <span>{ item.reason}</span> </p>
                    <p> <span className='text-gray-500'>Type </span>: <span>{item.type}</span> </p>
                    <p> <span className='text-gray-500'>Category </span>: <span>{item.category }</span> </p>
                    <p> <span className='text-gray-500'>Priority </span>: <span>{item.priority}</span> </p>
                    <p> <span className='text-gray-500'>Dept </span>: <span>{item.department}</span> </p>
                    <p> <span className='text-gray-500'>Location </span>: <span>{item.location}</span> </p>
                  </div>
                  <div className='flex flex-row gap-10 justify-center'>
                    <button
                      className='text-white bg-blue-600 px-4 rounded-xl'
                      onClick={() => handleButton(item._id, 'Running')}>
                      Start
                    </button>
                    <button
                      className='text-blue-600 px-4 border-blue-500 border-2 rounded-xl'
                      onClick={() => handleButton(item._id, 'Close')}>
                      Close
                    </button>
                    <button
                      className='text-blue-600 px-4 border-blue-500 border-2 rounded-xl'
                      onClick={() => handleButton(item._id, 'Cancelled')}>
                      Cancel
                    </button>

                  </div>
                </div>
              
              )
            }
          </div>
          <table className='w-full max-sm:hidden'>
            <thead className='bg-blue-200 max-sm:hidden '>
              <tr className='flex gap-1 '>
                <th className='w-44'>project Name</th>
                <th>Reason</th>
                <th>Type</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Dept.</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                allProject.map((item, i) => {
                  return <tr className='flex lg:mt-4 gap-1' key={i}>
                    <td className='w-44'>
                      <p className='text-xl font-semibold'>{item.projectName}</p>
                      <span className='text-xs'>{item.startDate} to {item.endDate}</span>
                    </td>
                    <td>{item.reason}</td>
                    <td>{item.type}</td>

                    <td>{item.category}</td>
                    <td>{item.priority}</td>
                    <td>{item.department}</td>
                    <td>{item.location}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className='text-white bg-blue-600 px-4 rounded-xl'
                        onClick={() => handleButton(item._id, 'Running')}>
                        Start
                      </button>
                    </td>
                    <td>
                      <button
                        className='text-blue-600 px-4 border-blue-500 border-2 rounded-xl'
                        onClick={() => handleButton(item._id, 'Close')}>
                        Close
                      </button>
                    </td>
                    <td>
                      <button
                        className='text-blue-600 px-4 border-blue-500 border-2 rounded-xl'
                        onClick={() => handleButton(item._id, 'Cancelled')}>
                        Cancel
                      </button>
                    </td>
                  </tr>

                }
                )
              }


            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default ShowProject
