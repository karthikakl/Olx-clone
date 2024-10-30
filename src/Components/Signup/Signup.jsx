import React, { useState,useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc,getFirestore,setDoc } from 'firebase/firestore';

export default function Signup() {
  const [username,setUsername]= useState('');
  const [email,setEmail]=useState('');
  const [number,setNumber]=useState('');
  const [password,setPassword]=useState('');
  const [error, setError] = useState('');
  const { app } = useContext(FirebaseContext)
  const auth =getAuth(app);
  const db = getFirestore(app)       //initializing the firestore;
  const navigate = useNavigate();   //for initializing useNavigate;
  

  const valiadateForm =()=>{
    if(!username){
      return 'username is required'
    }
    if(!email){
      return 'Email is required'
    }

    const emailPattern= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if(!emailPattern.test(email)){
      return 'Please enter a valid email'
    }

    if(!number||number.length!==10){
      return 'Phone number must be 10 digits';
    }
    if(!password || password.length<6){
      return 'Password must be at least 6 characters';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = valiadateForm();
    if(validationError){
      setError(validationError)
      return;
    }
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      
      const userData = {
        uid: user.uid,
        username: username,
        email: email,
        phone: number,
      };

      // to Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), userData);
      console.log('User signed up and data saved:', userData);

      navigate('/login')
    } catch (error) {
      console.error('Error during signup: ', error);
      setError('Signup failed. Please try again.');

    }
  };

  const handleLogIn =()=>{
    navigate('/login')
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="username"
            name="username"
            placeholder="Enter your username"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            name="email"
           placeholder="Enter your email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={number}
            onChange={(e)=>setNumber(e.target.value)}
            id="phone"
            name="phone"
           placeholder="Enter your number"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e=>setPassword(e.target.value))}
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          <br />
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>} 
          <button>Signup</button>
        </form>
        <a onClick={handleLogIn}>Login</a>
      </div>
    </div>
  );
}
