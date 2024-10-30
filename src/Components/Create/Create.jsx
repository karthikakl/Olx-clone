import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/Context'
import { storage } from '../../firebase/Config';
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import {db} from '../../firebase/Config';
import {collection,addDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
 
  const {user} = useContext(AuthContext);
  const [name,setName]=useState('');
  const [category,setCategory]=useState('');
  const [price,setPrice]=useState('');
  const [image,setImage]=useState(null);
  const navigate=useNavigate()
  const date =new Date()

  const handleSubmit = async() => {
   
    if(image){
      const storageRef = ref(storage,`/image/${image.name}`);
      try{
        const snapshot = await uploadBytes(storageRef,image);
        const url = await getDownloadURL(snapshot.ref)
        console.log('File available at',url);
        console.log("Submitting product with user UID:", user ? user.uid : "No user authenticated");
        if (user && user.uid) {
          await addDoc(collection(db, 'products'), {
            name,
            category,
            price: parseFloat(price), 
            url,
            userId: user.uid,
            createdAt: date.toDateString()
          });
          console.log('Product added');
          navigate('/')
        } else {
          console.log('User is not authenticated.');
        }
      } catch (error) {
        console.log('Error uploading file', error);
      }
    } else {
      console.log('No image');
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" 
            value={price} 
            onChange={(e)=>setPrice(e.target.value)}
            id="fname" name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
          
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
