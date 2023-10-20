import React, { useContext, useState } from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios';
import Logo from '../image/Logo.svg'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import { TokenForAll } from '../Context/GlobalContext'
const CreateProject = () => {
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dept, setDept] = useState("");
  const [priority, setPriority] = useState("");
  const { tokenAll, setTokenAll } = useContext(TokenForAll);
  const navigate = useNavigate();

  const handleSubmit = () => {

    if (name && reason && type && category && priority && dept && startDate && endDate && location && (endDate > startDate)) {
      const body = {
        projectName: name,
        reason: reason,
        type: type,
        category: category,
        priority: priority,
        department: dept,
        startDate: startDate,
        endDate: endDate,
        location: location,
        status: "Register"
      }
      const config = {
        headers: {}
      }
      axios.post("https://techprime-5pt0.onrender.com/project/create", body, config)
        .then(response => {
          console.log("Project Created Successfully");
        })
        .catch(err => {
          console.log(err);
        })

      setDone(true)
      setTimeout(() => {
        setDone(false)
      }, 3000)

    }
    else {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }
  const logout = () => {
    navigate('/');
    setTokenAll("");
    const config = { headers: { authorization: tokenAll } };
    axios.post('https://techprime-5pt0.onrender.com/user/logout', config)
      .then((res) => {
        navigate('/');
        setTokenAll("");
      })
      .catch(e => console.log(e));
  }

  return (
    <div className='flex'>

      <Navbar />

      <div className='w-full  overflow-hidden bg-blue-50  ml-16 max-sm:ml-0'>

        <div className='background h-28 w-full relative flex justify-items-center '>
          <span className='absolute top-7 left-4 text-white text-xl font-bold '>Create Project</span>
          <img src={Logo} alt="logo" className='h-12 m-auto max-sm:hidden' />
          <button className='absolute z-100 right-6 top-6 text-3xl text-white sm:hidden ' onClick={() => logout()}><AiOutlineLogout /></button>
        </div>

        <div className='-mt-4 m-2 p-4 bg-white rounded-xl relative pb-8 z-10 '>
          {error && <h1 className='bg-red-500 text-white font-bold border-2 border-red-500 text-center text-2xl'>Wrong Data</h1>}
          {done && <h1 className='bg-green-500 text-white font-bold border-2 border-green-500 text-center text-2xl'>Project created Successfully</h1>}
          <div className=' lg:ml-2 lg:mb-8'>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter Project Theme'
              type='text'
              className='w-2/3 h-20 max-sm:w-80 pl-2 border-2 border-gray-500 text-xl max-sm:pl-2 max-sm:w-68 max-sm:ml-3 max-sm:mb-4 rounded-md'
              id='name' />
          </div>

          <div className='grid grid-cols-3 justify-around justify-items-center gap-10  max-sm:gap-6 max-md:grid-cols-2 max-sm:grid-cols-1'>

            <div>
              <p className='text-gray-500'>Reason</p>
              <select className='w-96 h-10 border-2 rounded-lg border-gray-500 max-sm:w-80' onChange={(e) => setReason(e.target.value)}>
                <option selected disabled>Select</option>
                <option value='Bussiness'>Bussiness</option>
                <option value="Dealership">Dealership</option>
                <option value="transport">transport</option>
              </select>
            </div>

            <div>
              <p className='text-gray-500'>Type</p>
              <select className='w-96 h-10 border-2 rounded-lg border-gray-500 max-sm:w-80' onChange={(e) => setType(e.target.value)} >
                <option selected disabled>Select</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
            

            <div>
              <p className='text-gray-500'>Category</p>
              <select className='w-96 h-10 border-2 rounded-lg border-gray-500 max-sm:w-80' onChange={(e) => setCategory(e.target.value)} >
                <option selected disabled>Select</option>
                <option value='Quality A'>Quality A</option>
                <option value='Quality B'>Quality B</option>
                <option value='Quality B'>Quality B</option>
                <option value='Quality D'>Quality D</option>

              </select>
            </div>
            <div>
              <p className='text-gray-500'>Priority</p>
              <select className='w-96 h-10 border-2 rounded-lg border-gray-500 max-sm:w-80' onChange={(e) => setPriority(e.target.value)} >
                <option selected disabled>Select</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <p className='text-gray-500'>Division</p>
              <select className='w-96 h-10 border-2 rounded-lg border-gray-500 max-sm:w-80'  >
                <option selected disabled>Select</option>
                <option value='Quality A'>Quality A</option>
                <option value='Quality B'>Quality B</option>
                <option value='Quality B'>Quality B</option>
                <option value='Quality D'>Quality D</option>

              </select>
            </div>

            <div>
              <p className='text-gray-500'>Department</p>
              <select className='w-96 h-10 border-2 rounded-lg border-gray-500 max-sm:w-80' onChange={(e) => setDept(e.target.value)}>
                <option selected disabled>Select</option>
                <option value='Quality'>Quality</option>
                <option value='Startegy'>Startegy</option>
                <option value='Maintenance'>maintenance</option>
                <option value='Stores'>stores</option>
                <option value='Finance'>finance</option>


              </select>
            </div>

            <div>
              <p className='text-gray-500'>Start Date</p>
              <input className='w-96 h-10 border-2 rounded-lg border-gray-500 max-sm:w-80' type='date' placeholder='startDate' onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <p className='text-gray-500'>End Date</p>
              <input className='w-96 h-10 border-2 rounded-lg max-sm:w-80 border-gray-500' type='date' onChange={(e) => setEndDate(e.target.value)} />

            </div>

            <div>
              <p className='text-gray-500'>Location</p>
              <select className='w-96 h-10 border-2 rounded-lg border-gray-500 max-sm:w-80' onChange={(e) => setLocation(e.target.value)}>
                <option selected disabled>Select</option>
                <option value='uttar pradesh'>UTTAR PRADESH</option>
                <option value='delhi'>DELHI</option>
                <option value='mumbai'>MUMBAI</option>
              </select>
            </div>
            <div></div>
            <div></div>

            <div className='flex justify-start'>
              <p><span className='text-gray-500 '>Status :</span>
                <span className='font-semibold text-xl'> Register</span>
              </p>

            </div>
            <div className='flex max-sm:justify-center max-sm:mb-20 sm:absolute sm:right-2 top-1'>
              <button
                onClick={() => handleSubmit()}
                className='text-white hover:bg-blue-600 bg-blue-800 px-6 rounded-xl py-2  w-36 mt-5 ml-5 max-sm:mt-1 max-sm:w-72 sm:rounded-3xl'
              >Save Project</button>
            </div>
          </div>
        </div>


      </div>

    </div>
  )
}

export default CreateProject
