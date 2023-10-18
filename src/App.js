import { Route, Routes } from 'react-router';
import './App.css';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Home from './routes/Home';
import CreateProject from './component/CreateProject';
import ShowProject from './component/ShowProject';


function App() {
  return (
    <>
    
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/log' element={<Login />} />
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/create' element={<CreateProject />} />
      <Route path='/show' element={<ShowProject />}/>
      <Route />
     </Routes>
    </>
  );
}

export default App;
