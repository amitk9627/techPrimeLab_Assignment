import { Route, Routes } from 'react-router';
import './App.css';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Home from './routes/Home';
import CreateProject from './component/CreateProject';
import ShowProject from './component/ShowProject';
import ProtectRoutes from './ProtectRoutes'

function App() {
  return (
    <>
    
     <Routes>
      <Route path='/home' element={<ProtectRoutes><Home/></ProtectRoutes>}/>
      <Route path='/' element={<Login />} />
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/create' element={<ProtectRoutes><CreateProject /></ProtectRoutes>} />
      <Route path='/show' element={<ProtectRoutes><ShowProject /></ProtectRoutes> }/>
      <Route />
     </Routes>
    </>
  );
}

export default App;
