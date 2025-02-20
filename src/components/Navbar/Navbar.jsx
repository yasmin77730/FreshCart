import React, { useContext, useEffect } from 'react'
import cartlogo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../context/User.context'
import { CartContext } from '../../context/Cart.context'



export default function Navbar() {
 let {token ,logOut}= useContext(UserContext)
 let{cartInfo,getCartProducts} =useContext(CartContext)

 useEffect(()=>{
  getCartProducts()
 },[])
  return (<>

    <nav className='bg-slate-100 py-4 fixed top-0 left-0 right-0 z-50'>
     <div className="container mx-auto flex items-center gap-12 px-12">
      <a href="">
        <img src={cartlogo} alt="" />
      </a>
    
    {token && <>
      <ul className='flex gap-5 mx-2 items-center' >
        <li>
          <NavLink  to="/">Home</NavLink>
        </li> 
        <li><NavLink  to="/products">Products</NavLink></li>
        <li><NavLink  to="/categories">Categories</NavLink></li>
        <li><NavLink  to="/brands">Brands</NavLink></li>
        <li><NavLink  to="/allorders">Orders</NavLink></li>
      </ul>

      <Link to="/Cart" className='carticon relative ml-auto px-2 cursor-pointer flex items-center'>
        <i className="fa-solid fa-cart-shopping "></i>
      <div className="cart-counter flex justify-center items-center absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full text-white bg-primary-800 ">
    {cartInfo ===null ? <i class="fa-solid fa-spinner fa-spin"></i> 
    :(  <span className='text-sm '>{cartInfo.numOfCartItems  }</span>)

    }
      </div>
      </Link ></>}
    
      <ul className={`flex gap-5 mx-3 items-center ${!token ? "ms-auto" : ""}`}>
        <li><NavLink to="https://instagram.com" target='_blank'><i class="fa-brands fa-instagram"></i></NavLink></li>
        <li><NavLink to="https://facebook.com" target='_blank'><i class="fa-brands fa-facebook"></i></NavLink></li>
        <li><NavLink to="https://tiktok.com" target='_blank'><i class="fa-brands fa-tiktok"></i></NavLink></li>
        <li><NavLink to="https://twitter.com" target='_blank'><i class="fa-brands fa-twitter"></i></NavLink></li>
        <li><NavLink to="https://linkedin.com" target='_blank'><i class="fa-brands fa-linkedin"></i></NavLink></li>
        <li><NavLink to="https://youtube.com" target='_blank'><i class="fa-brands fa-youtube"></i></NavLink></li>
      </ul>

      <ul className='flex gap-5 items-center'>
        {token && <>
          <li className='list-none' onClick={logOut}><NavLink to=""><i class="fa-solid fa-right-from-bracket"></i></NavLink></li>
          </>}
      </ul>
      {!token && (
  <>
    <li className="list-none"><NavLink to="/signup">SignUp</NavLink></li>
    <li className="list-none"><NavLink to="/login">Login</NavLink></li>
  </>
)}

     </div>
    </nav>
    </> )
}
