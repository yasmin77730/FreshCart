import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/User.context'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Orders() {
    const {token}=useContext(UserContext);
    const[orders,setOrders]=useState(null)
    let {id}=jwtDecode(token)
    

    async function getUserOrders() {
        try {
            const options={
                url:`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method:"GET"
            }
            let {data}=await axios.request(options)
            console.log(data)
            setOrders(data)
            
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(()=>{
        getUserOrders()
    },[])
  return (
  <>
  <Helmet>
    <title>Orders</title>
  </Helmet>
 {
    orders? <section className='space-y-3'>
   {orders.map((order)=> <div key={order.id } className=" mt-4 order p-4 border-2 border-gray-600 border-opacity-25 rounded-lg">
        <header className='flex justify-between items-center'>
            <div>
                <h2 className='text-gray-500'>Order ID</h2>
                <span className='text-lg font-semibold text-gray-700'>#564878</span>
            </div>
            <div>
               {order.isPaid?( <span className='inline-block px-3 py-1 mx-2 bg-red-500 text-white font-semibold rounded-full font-cairo' > تم الدفع </span>)
               :
               (<span className='inline-block px-3 py-1 bg-lime-500 text-white font-semibold rounded-full font-cairo mx-2'> غير مدفوع</span>)}
               {order.isDelivered? (<span className='inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-full font-cairo'> تم الاستلام</span>):
               (<span className='inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-full font-cairo'> قيد التوصيل</span>)


               }
            
            </div>
        </header>
        <div className='grid mt-4 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
         {order.cartItems.map((product)=>(   <div key={product._id} className="overflow-hidden product-item border-2 border-gray-400 rounded-lg  border-opacity-30">
                <img src={product.product.imageCover}
                 alt=""
                 className='w-full'/>
               <div className='p-3'> 
                <h3 className='line-clamp-2'><Link to={`/product/${product.product.id}`}>{product.product.title}</Link> </h3>
                <div className='flex justify-between items-center mt-2'>
                    <p ><span className='font-bold underline mx-1'>count:</span>{product.count}</p>
                    <span>{product.price}L.E</span>
                </div></div>
            </div>))}
        </div>
        <p className='my-3 text-lg '>Your Total Order Price is <span className='mx-1 font-bold text-primary-800'>{order.totalOrderPrice}</span>L.E</p>
    </div>)}
  </section>:<Loading/>
 }
  </>
  )
}
