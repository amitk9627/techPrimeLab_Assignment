import { useContext } from 'react'
import {TokenForAll } from './Context/GlobalContext'
import PNP from './routes/PNP';
const ProtectedRoutes = ({children}) => {
    const {tokenAll}=useContext(TokenForAll);
    if(tokenAll){
        return children
    }
    return <PNP />
}

export default ProtectedRoutes;
