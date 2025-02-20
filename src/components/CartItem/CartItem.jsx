import React, { useContext } from 'react'
import { CartContext } from '../../context/Cart.context';
import { Link } from 'react-router-dom';

export default function CartItem({productInfo}) {
  let {removeProductFromCart,updateProductCount}=useContext(CartContext)

let {count,price,product}=productInfo;
  let {title,imageCover,category,id}=product;
  return (
   <>
   <div className='flex gap-2'>
    <div className="card-item grow flex justify-between items-center rounded-md bg-gray-100 py-4 px-6">
        <img src={imageCover} alt={title}  className='w-24 h-24 rounded-full object-cover border-4 border-white'/>
        <h3>
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>
        <h4>{category.name}</h4>
        <div className="count flex gap-5 items-center">
          <span className=' font-bold text-gray-700'>{count}</span>
          <div className="icons space-y-2">
            <div onClick={()=>{
              updateProductCount({productId:id,count:count+1})
            }}
            className="plus  bg-gray-700 text-white rounded-full w-6  h-6  flex justify-center items-center cursor-pointer ">
              <i className='fa-solid fa-plus  '></i>
            </div>
            <div onClick={()=>{
              updateProductCount({productId:id,count:count-1})
            }}
            className="minus bg-gray-700 text-white rounded-full w-6 h-6 flex justify-center items-center cursor-pointer" >
              <i className='fa-solid fa-minus '></i>
            </div>
          </div> 
        </div>
        <span>{price} L.E</span>

    </div>
    <button onClick={()=>{
      removeProductFromCart({productId:id})
    }}
     className=' p-3 rounded-md bg-gray-100 hover:bg-gray-200 transition-all duration-100'>
      <i className='fa-solid fa-xmark'></i>
    </button>
   </div>

   </>
  )
}
