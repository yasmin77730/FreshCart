import React from 'react'
import paypalimg from '../../assets/images/paypal.png'
import amazonimg from '../../assets/images/amazon-pay.png'
import mastercard from '../../assets/images/mastercard.webp'
import americanimg from '../../assets/images/American-Express-Color.png'
import googleplay from '../../assets/images/get-google-play.png'
import applestore from '../../assets/images/get-apple-store.png'




export default function Footer() {
  return (
   <>
   <footer className='bg-slate-100 py-9  w-full '>
    <div className="container px-12">
      <header className='py-3'>
        <h2 className='font-semibold text-xl text-slate-800'>Get The freshCart App</h2>
        <p className=' text-slate-400'>We will send you a link ,open it on your phone to download the app </p>
      </header>
      <div className=' flex justify-between'>
        <input className='form-control w-[83%]' type="email" placeholder='Email' />
        <button className='btn bg-primary-800 hover:bg-primary-950 w-[15%] text-white rounded-md py-1'>Share App Link</button>

      </div>
 <div className="paySection flex justify-between py-5 border-y-2 border-slate-400 border-opacity-50 my-6">
 <div className="payment flex gap-3 items-center">

<h3>payment partner</h3>
<img className='w-20' src={amazonimg} alt="amazon pay img" />
<img className='w-20' src={americanimg} alt="american-express img" />
<img className='w-16' src={mastercard} alt="mastercard img" />
<img className='w-20' src={paypalimg} alt="paypal img" />
</div>  
<div className="download flex gap-3 items-center">
  <h3>Get deliveries with FreshCart</h3>
  <img className='w-20' src={googleplay} alt="google play img" />
<img className='w-20' src={applestore} alt="applestore img" />
</div>
 </div>
  </div>
   </footer>
   </>
  )
}
