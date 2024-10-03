import { createContext, useState } from "react";
import React from "react";
export const AppContext = createContext();

function AppContextProvider({children}){
   const [type , setType]  =  useState(null);
   const [loading , setLoading]  =  useState(false);
   const value = {
    type,
    setType,
    loading,
    setLoading
   };
   return <AppContext.Provider value={value}>
    {children}
   </AppContext.Provider>
}