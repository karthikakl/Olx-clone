import React,{useContext, useEffect,useState} from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection,where,query,getDocs } from 'firebase/firestore';

function View() {
const [userDetails,setUserDetails]=useState(null)
const {postDetails}=useContext(PostContext)
const {db} = useContext(FirebaseContext);

useEffect(()=>{
  if(postDetails){
  const {userId}=postDetails
  console.log('PostDetails:',postDetails);
  console.log("Userid:",userId)

  const fetchUserDetails=async()=>{
    try{
       const q = query(collection(db,'users'),where('id','==',userId));
       const querySnapshot = await getDocs(q);

       querySnapshot.forEach((doc)=>{
        console.log('User document data:', doc.data());
        setUserDetails(doc.data());
       });
    }catch(error){
      console.log('Error fetching user details:',error)
    }
  }

  fetchUserDetails();
  }
  
},[postDetails,db]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createdAt}</span>
        </div>
       { userDetails && ( 
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div> 
      )}
      </div>
    </div>
  );
}
export default View;
