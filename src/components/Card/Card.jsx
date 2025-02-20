import React, { useContext } from 'react'
import playstation from '../../assets/images/playstation.jpeg'
import { CartContext } from '../../context/Cart.context';
import { Link } from "react-router-dom";

export default function Card({productInfo}) {
  let {addProductToCart} =useContext(CartContext);

    const {imageCover,title,price,category, description,ratingsAverage,id} = productInfo;
    

  return (
<>
<div className="card group/card rounded-lg shadow-lg">

   <div className="image relative">
   <img 
    src={imageCover}
     alt=''/>
     <div className="layer group-hover/card:opacity-100 gap-4 absolute left-0 top-0 flex justify-center items-center bg-opacity-40 opacity-0 bg-slate-400 w-full h-full ">
        <div className="icon w-8 h-8 rounded-full flex justify-center items-center text-white bg-primary-900">
        <i class="fa-solid fa-heart"></i>
        </div>
        <div onClick={()=>{
          addProductToCart({productId:id})
        }}
        className="icon w-8 h-8 rounded-full flex justify-center items-center text-white bg-primary-900">
        <i class="fa-solid fa-cart-shopping"></i>
        
        </div>
        
        <Link  to={`/product/${id}`} className="icon w-8 h-8 rounded-full flex justify-center items-center text-white bg-primary-900">
        <i class="fa-solid fa-eye"></i>
        </Link>
     </div>
   </div>
    
    
    
    
    
    
    
    
    <div className="card-body p-4 space-y-3">
        <header>
            <h3 className='font-semibold text-lg line-clamp-1'>{title}</h3>
            <h4 className='text-primary-900'>{category.name}</h4>
        </header>
        <footer className='flex justify-between'>
            <span>{price} L.E</span>
            <div className="rate">
            <i class="fa-solid fa-star text-yellow-300"></i>
            <span>{ratingsAverage}</span>
            </div>
        </footer>

     </div>
</div>


</>
  )
}

