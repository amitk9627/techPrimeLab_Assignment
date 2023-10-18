import React, { createContext,useState } from 'react'

export const TokenForAll = createContext();


const GlobalToken = ({ children }) => {
    const [tokenAll,setTokenAll]=useState("");
    return (
        <TokenForAll.Provider value={{tokenAll,setTokenAll}}>
            {children}
        </TokenForAll.Provider>
    )
}


export default GlobalToken;
