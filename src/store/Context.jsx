import {createContext, useEffect, useState } from 'react'
import {auth , db} from '../firebase/Config'

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null)

export default function Context ({children}){
    const [user,setUser]=useState(null)

    useEffect(()=>{
        const unsubscribe =auth.onAuthStateChanged((user)=>{
            setUser(user);
            // console.log('state changed:',user)
        });
        return()=>unsubscribe();
    },[])

    return(
        <AuthContext.Provider value={{user,setUser,db}}>
             <FirebaseContext.Provider value={{ db }}>
            {children}
            </FirebaseContext.Provider>
        </AuthContext.Provider>
    );

}