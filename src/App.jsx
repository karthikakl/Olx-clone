import React,{useEffect,useContext} from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import Signup from './Pages/Signup'
import Login from  './Pages/Login'
import Home from './Pages/Home';
import View from './Pages/ViewPost';
import { AuthContext} from './store/Context';
import {auth } from './firebase/Config'
import Create from './Components/Create/Create';
import Post from './store/PostContext';

function App() {
  const {user,setUser} = useContext(AuthContext)
  
  useEffect(()=>{
     console.log(user);
     const unsubscribe=auth.onAuthStateChanged((user)=>{
     setUser(user);
    //  console.log("User in App component:", user); 

     })
     return()=>unsubscribe();
  },[setUser]);

  return (
    <div>
      <Post>
      <Router>
        <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route path='/Signup' element={<Signup />}> </Route>
        <Route path='/login' element={<Login/>}> </Route>
        <Route path='/create' element={<Create/>}> </Route>
        <Route path='/view' element={<View/>}> </Route>
        </Routes>
        </Router>
        </Post>
    </div>
  );
}

export default App;
