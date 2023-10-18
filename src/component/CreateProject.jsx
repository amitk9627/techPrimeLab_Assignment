import React, { useContext, useState } from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios';
import Logo from '../image/Logo.svg'
import { useNavigate} from 'react-router-dom'
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
  const { tokenAll} = useContext(TokenForAll);
  const navigate=useNavigate();

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

      <div className='w-full overflow-hidden bg-blue-50'>

        <div className='background h-20 w-full relative flex justify-items-center'>
          <span className='absolute top-7 left-4 text-white text-xl font-bold '>Create Project</span>
          <img src={Logo} alt="logo" className=' h-12 m-auto max-sm:hidden' />
          <button className='absolute z-100 right-6 top-6 text-3xl text-white sm:hidden' onClick={()=>logout()}><AiOutlineLogout /></button>
        </div>

        <div className='m-2 p-4 bg-white rounded-xl relative'>
          {error && <h1 className='text-red-500 font-bold border-2 border-red-500 text-center text-2xl'>Wrong Data</h1>}
          {done && <h1 className='text-green-500 font-bold border-2 border-green-500 text-center text-2xl'>Project created Successfully</h1>}
          <div className=' lg:ml-8 lg:mb-2'>

            <p className='max-sm:hidden mb-1 text-gray-500'><label htmlFor='name'>Project Name</label></p>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter Project Theme'
              type='text'
              className='lg:w-1/2 h-20  border-2 border-gray-500 text-xl max-sm:pl-2 max-sm:w-68 max-sm:ml-9 max-sm:mb-4 rounded-md'
              id='name' />
          </div>

          <div className='grid grid-cols-3 justify-around justify-items-center gap-10  max-sm:gap-6 max-md:grid-cols-2 max-sm:grid-cols-1'>

            <div>
              <p className='text-gray-500'>Reason</p>
              <select className='w-64 h-10 border-2 border-gray-500' onChange={(e) => setReason(e.target.value)}>
                <option selected disabled>Select</option>
                <option value='Bussiness'>Bussiness</option>
                <option value="Dealership">Dealership</option>
                <option value="transport">transport</option>
              </select>
            </div>

            <div>
              <p className='text-gray-500'>Type</p>
              <select className='w-64 h-10 border-2 border-gray-500' onChange={(e) => setType(e.target.value)} >
                <option selected disabled>Select</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>

            <div>
              <p className='text-gray-500'>Category</p>
              <select className='w-64 h-10 border-2 border-gray-500' onChange={(e) => setCategory(e.target.value)} >
                <option selected disabled>Select</option>
                <option value='Quality A'>Quality A</option>
                <option value='Quality B'>Quality B</option>
                <option value='Quality B'>Quality B</option>
                <option value='Quality D'>Quality D</option>

              </select>
            </div>
            <div>
              <p className='text-gray-500'>Priority</p>
              <select className='w-64 h-10 border-2 border-gray-500' onChange={(e) => setPriority(e.target.value)} >
                <option selected disabled>Select</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <p className='text-gray-500'>Department</p>
              <select className='w-64 h-10 border-2 border-gray-500' onChange={(e) => setDept(e.target.value)}>
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
              <input className='w-64 h-10 border-2 border-gray-500' type='date' placeholder='startDate' onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <p className='text-gray-500'>End Date</p>
              <input className='w-64 h-10 border-2 border-gray-500' type='date' onChange={(e) => setEndDate(e.target.value)} />

            </div>

            <div>
              <p className='text-gray-500'>Location</p>
              <select className='w-64 h-10 border-2 border-gray-500' onChange={(e) => setLocation(e.target.value)}>
                <option selected disabled>Select</option>
                <option value='uttar pradesh'>UTTAR PRADESH</option>
                <option value='delhi'>DELHI</option>
                <option value='mumbai'>MUMBAI</option>
              </select>
            </div>

            <div>
              <p>Status :
                <span className='font-semibold '> Register</span>
              </p>

            </div>
            <div className='flex max-sm:justify-center max-sm:mb-20 sm:absolute sm:right-2 top-1'>
              <button
                onClick={() => handleSubmit()}
                className='text-white hover:bg-blue-800 bg-blue-600 p-4 rounded-md w-36 mt-5 ml-5 max-sm:mt-1  sm:rounded-3xl'
              >Save Project</button>
            </div>
          </div>
        </div>


      </div>

    </div>
  )
}

export default CreateProject
