import { useContext } from 'react'
import {TokenForAll } from './Context/GlobalContext'
const ProtectedRoutes = ({children}) => {
    const {tokenAll}=useContext(TokenForAll);
    if(tokenAll){
        return children
    }
 
}

export default ProtectedRoutes;
