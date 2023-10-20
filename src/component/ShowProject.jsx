import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios';
import Logo from '../image/Logo.svg'
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { TokenForAll } from '../Context/GlobalContext'
const ShowProject = () => {
  const [allProject, setAllproject] = useState([]);
  const [search, setSearch] = useState("");
  const [bool, setBoolean] = useState(false);
  const { tokenAll, setTokenAll } = useContext(TokenForAll);
  const navigate = useNavigate();
  const [sorted, setSorted] = useState("status");
  const [page, setPage] = useState(1);
  const pageValue=allProject.length>10 ? allProject.length / 10 : allProject.length;
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
  useEffect(() => {
    if (search) {
      const searchData = allProject.filter((item) => item.projectName.includes(search));
      setAllproject(searchData)
    } else {
      fetch('https://techprime-5pt0.onrender.com/project/getProject')
        .then(res => res.json())
        .then((data) => setAllproject(data.allprojects))
    }
  }, [search])

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
    navigate('/');
    setTokenAll("");
    axios.post('https://techprime-5pt0.onrender.com/user/logout', { headers: { authorization: tokenAll } })
      .then((res) => {
        navigate('/');
        setTokenAll("");
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    const sortData = allProject.sort((a, b) => b[sorted].localeCompare(a[sorted]));
    setAllproject(sortData)

  }, [sorted])
  const handlePage=(selPage)=>{
    if(selPage>=1 && selPage<=allProject.length && selPage!==page){
      setPage(selPage)
    }

    
  }

  return (
    <div className='flex bg-blue-100'>

      <Navbar />

      <div className='w-full h-screen ml-16 max-sm:ml-0'>
        <div className=' h-20 w-full relative flex justify-items-center background'>
          <span className='absolute top-7 left-4  text-white text-xl font-bold'>Project Listing</span>
          <img src={Logo} alt="logo" className=' h-12 m-auto max-sm:hidden' />
          <button className='absolute z-100 right-6 top-6 text-3xl text-white sm:hidden' onClick={() => logout()}><AiOutlineLogout /></button>
        </div>
        <div className='w-full  bg-blue-100'>
          <div className='m-4 bg-white rounded-3xl '>
            <div className='p-2 flex justify-between w-full'>

              <div>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text"
                  className='border-b-2 border-0 h-10 w-64 max-sm:w-48 pl-2 text-lg  ' placeholder='Search' />
              </div>
              <div>
                <label htmlFor='sort' className='text-gray-500'>Sort By : </label>
                <select id='sort' onChange={(e) => { setSorted(e.target.value) }}>
                  <option value="" selected disabled>Selected</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                  <option value="startDate">startDate</option>
                  <option value="endDate">endDate</option>
                </select>
              </div>

            </div>

            <div className='sm:hidden'>
              {
                allProject.slice(page*10-10,page*10).map((item, i) =>
                  <div className='h-72  rounded-xl max-sm:mb-6 max-sm:shadow-lg' key={i}>
                    <div className='p-3 text-xl flex justify-between gap-4'>
                      <div>
                        <p className='font-semibold'>{item.projectName}</p>
                        <span className='text-xs'>{item.startDate} to {item.endDate}</span>
                      </div>
                      <div>{item.status}</div>
                    </div>
                    <div className=' pl-4'>
                      <p> <span className='text-gray-500'>Reason </span>: <span>{item.reason}</span> </p>
                      <p> <span className='text-gray-500'>Type </span>: <span>{item.type}</span> </p>
                      <p> <span className='text-gray-500'>Category </span>: <span>{item.category}</span> </p>
                      <p> <span className='text-gray-500'>Priority </span>: <span>{item.priority}</span> </p>
                      <p> <span className='text-gray-500'>Dept </span>: <span>{item.department}</span> </p>
                      <p> <span className='text-gray-500'>Location </span>: <span>{item.location}</span> </p>
                    </div>
                    <div className='flex flex-row gap-10 justify-center mt-2'>
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
                  <th className='w-44'>Project Name</th>
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
                  allProject.slice(page * 5-5, page * 5).map((item, i) => {
                    return <tr className='flex lg:mt-4 gap-1 box-border lg:mb-2' key={i}>
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
          {
            allProject &&
            <div className='mb-28 flex gap-10 max-sm:gap-1 justify-center '>
              <span onClick={()=>handlePage(page-1)} className='h-8 w-8 max-sm:h-8 max-sm:p-0 max-sm:w-8  border-2 rounded-full border-gray-500 text-md text-center text-blue-700 font-bold'>{"<-"}</span>

              {
                [...Array(pageValue)].map((item, i) =>
                  <span 
                    onClick={()=>handlePage(i+1)}
                    key={i} 
                    className='h-8 w-8  border-2 max-sm:h-8 max-sm:p-0 max-sm:w-8 border-gray-500 rounded-full text-md text-center'
                    id={page===i+1 ? "selpage":""}
                  >
                    {i + 1}
                  </span>
                )
              }
              <span onClick={()=>handlePage(page+1)} className='h-8 w-8 max-sm:h-8 max-sm:w-8 max-sm:p-0  border-2 rounded-full border-gray-500 text-md text-center text-blue-700 font-bold'>{"->"}</span>
            </div>
          }
        </div>
      </div>

    </div>
  )
}

export default ShowProject
