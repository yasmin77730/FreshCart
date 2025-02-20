import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../context/Cart.context';
import ReactImageGallery from 'react-image-gallery';
import "swiper/css"
import { SwiperSlide,Swiper } from 'swiper/react';
import Card from '../../components/Card/Card';
import useOnline from '../../hooks/useOnline';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
    let[productDetails,setProductDetails]=useState(null);
    let[relatedProducts,setRelatedProducts]=useState(null);
    let {addProductToCart}=useContext(CartContext)

    let {id} =useParams();
    

   async function getProductDetails(){
        try {
            const options={
                url:`https://ecommerce.routemisr.com/api/v1/products/${id}`,
                method:"GET"
            }
           let {data}= await axios.request(options)
           console.log(data)
           setProductDetails(data.data)
            
        } catch (error) {
            console.log(error)
        }
    }


    async function getRelatedProducts() {
        try {
            const options={
                url:`https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
                method:"GET"
            }
           let {data}= await axios.request(options);
           setRelatedProducts(data.data)
           console.log(data)
            
        } catch (error) {
            console.log(error)
        }
        
    }
// initial render + update >> state id
   useEffect(()=>{
getProductDetails()
   },[id]) 

useEffect(()=>{
    if(productDetails=== null) return;
getRelatedProducts()
},[productDetails])

let isOnline= useOnline()

  return (
 <>
 <Helmet>
    <title>Product Details</title>
 </Helmet>
{productDetails ? (
    <>
    <Helmet>
        <title>{productDetails.title}</title>
    </Helmet>
    <section className=' grid grid-cols-12 gap-12 w-full h-1/2 my-6 '>
    <div className='col-span-3 '>
        <ReactImageGallery showFullscreenButton={false}  showPlayButton={false} showNav={false}
        items={productDetails.images.map((image)=>{
            return{
                original:image,
                thumbnail:image
            }
        })}
        />
    </div>
    <div className='col-span-9 space-y-4'> 
    <div><h2 className='text-xl font-semibold text-gray-700'>{productDetails.title}</h2>
    <h3 className='text-primary-800 font-semibold'>{productDetails.category.name}</h3> </div>
        <p className='text-gray-500'>{productDetails.description}</p>
        <div className=' flex justify-between items-center'>
    <span>{productDetails.price}</span>
            <div className=''>
            <i class="fa-solid fa-star mr-2 text-yellow-300"></i>
                <span>{productDetails.ratingsAverage}</span>
            </div>

        </div>
       {isOnline &&  <button onClick={()=>{
            addProductToCart({productId:id })
        }}
        className='btn w-full bg-primary-600 hover:bg-primary-700 font-semibold text-white'>ADD TO CART
        </button>}
        </div>
 </section>
 <section>
    <h2 className='text-2xl font-semibold'>Related Products</h2>
    {relatedProducts? <Swiper slidesPerView={6} spaceBetween={15}>
        {relatedProducts.map((product)=><SwiperSlide key={product.id}>
            <Card productInfo={product}/>
        </SwiperSlide>)}
    </Swiper> :<Loading/>}
 </section>
 
 </>):<Loading/>

    
}
 </>
  )
}
