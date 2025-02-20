import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../context/Cart.context'
import Loading from '../../components/Loading/Loading'
import CartItem from '../../components/CartItem/CartItem'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {

 let {getCartProducts,cartInfo ,clearCart}= useContext(CartContext)

 useEffect(()=>{
  getCartProducts()
 },[])

  return (
 <>
 <Helmet>
  <title>Cart</title>
 </Helmet>
 {cartInfo ===null ? (<Loading/>):
 (<section className='my-7'>
  <div className='flex gap-8  items-center '>
    <i className='fa-brands fa-opencart text-3xl'></i>
    <h2 className=' pl-4 text-xl text-slate-600 font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2'>Your Shopping Cart</h2>
  </div>
  {cartInfo.numOfCartItems===0 ?(
    <div className='mb-20 mt-6 bg-gray-100 p-7 rounded-md shadow flex justify-center items-center flex-col gap-3'>
      <h2>Oops! Your cart is empty . Start shopping now by clicking the button below and find something you love!</h2> 
      <Link to= "/" className='btn bg-primary-600 hover:bg-primary-800 text-white'>Back To Home</Link>
    </div>
  ) :
  (<>
   <div className='space-y-4 mt-6'>
    {cartInfo.data.products.map((product)=><CartItem key={product._id} productInfo={product} />
    )}
    
  </div>
  <div className='flex mt-5 justify-between items-center'>
    <p className='text-xl'><i class="fa-solid fa-dollar-sign text-xl mr-2 text-primary-700"></i>Your Total Cart Price <span className='text-primary-700 font-bold'>{cartInfo.data.totalCartPrice}</span></p>
    <button onClick={clearCart}
    className='btn bg-red-500 hover:bg-red-600 text-white'><i class="fa-solid fa-trash px-2"></i>Clear Cart</button>
  </div>
  <Link to={'/checkout'} className='font-semibold inline-block w-full btn bg-primary-600 hover:bg-primary-800 text-center mt-8  text-white '>Next Step (Payment)</Link>
  </>

  )}

 </section>)}
 </>
  )
}
