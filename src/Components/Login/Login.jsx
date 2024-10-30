import React, { useState , useContext } from 'react';
import { FirebaseContext } from '../../store/Context'
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {app} = useContext(FirebaseContext);
  const auth = getAuth(app);
  const navigate=useNavigate();
  
  const handleLogin = async(e)=>{
   e.preventDefault();
   try{
    const userCredential= await signInWithEmailAndPassword(auth,email,password)
    const user=userCredential.user;
    console.log('user logged in',user);
    navigate('/')
   }catch(error){
    console.error('Error',error)
   }
  }

  const handleSignUp =()=>{
    navigate('/Signup')
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={handleSignUp}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
