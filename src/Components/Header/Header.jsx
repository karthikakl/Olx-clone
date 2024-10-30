import React,{useContext,useRef} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

// const colorChange = ()=>{
//   const textColour = useRef();
// }


function Header() {
  const {user}=useContext(AuthContext);
  const {app}=useContext(FirebaseContext);
  const navigate=useNavigate();
  const auth=getAuth(app);

 const handleLogIn=()=>{
  navigate('/login')
 };

 const handleSell=()=>{
  if(user){
    navigate('/create')
  }else{
    navigate('/login')
  }
 }

  const handleLogout=()=>{
    auth.signOut().then(()=>{
      navigate('/login')
    }).catch((error)=>{
      console.error('logout error:',error)
    });
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={handleLogIn} style={{cursor:'pointer'}}>{user ? (user.username||user.email||'User' ):'Login'}</span>
          <hr />
          
        </div>
        {user && (
          <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
        )}
        <div className="sellMenu" onClick={handleSell} style={{cursor:'pointer'}}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span >SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
