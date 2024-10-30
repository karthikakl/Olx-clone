import React,{useEffect,useContext,useState} from 'react';
import { AuthContext } from '../../store/Context';
import Heart from '../../assets/Heart';
import { getDocs,collection } from 'firebase/firestore';
import './Post.css';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const { db } = useContext(AuthContext); 
  const [products, setProducts] = useState([]); 
  const {setPostDetails} = useContext(PostContext);
  const navigate=useNavigate();

  const fetchProducts = async () => {
    if (!db) {
      console.error("Database not initialized");
      return;
    }
    
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ ...doc.data(), id: doc.id });
      });
      setProducts(productsArray);
      console.log(productsArray)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [db]); // Fetch products when db is available

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

{ products.map(product=>{

return(<div
className="card"
onClick={()=>{
 setPostDetails(product)
 navigate('/View')
}}
>
<div className="favorite">
  <Heart></Heart>
</div>
<div className="image">
  <img src={product.url} alt="" />
</div>
<div className="content">
  <p className={product.price}>&#x20B9; 250000</p>
  <span className="kilometer"> {product.name}</span>
  <p className="name">{product.category}</p>
</div>
<div className="date">
  <span>{product.createdAt}</span>
</div>
</div>
)
})
         
}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
