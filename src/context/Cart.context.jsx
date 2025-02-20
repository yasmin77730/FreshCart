
import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartInfo ,setCartInfo]=useState(null)

  async function addProductToCart({ productId }) {
    const toastId = toast.loading("Adding product...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      const { data } = await axios(options);
      if (data.status === "success") {
        toast.success(data.message);
        getCartProducts()
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart.");
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function getCartProducts() {
    try {
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/cart",
          method: "GET",
          headers: {
            token,
          },
        };
        const { data } = await axios(options);
      console.log(data)
      setCartInfo(data)
      } catch (error) {
        console.error(error);
       
      } 
      }
    
  async function removeProductFromCart({productId}) {
    let toastId=toast.loading("Deleting Product.......")
    try {const options={
      url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      method:"DELETE",
      headers:{
        token
      }
    }
    let {data}=await axios.request(options);
    console.log(data)
    if(data.status==="success"){
      toast.success("Product has been deleted")
      setCartInfo(data)
    }
      
    } catch (error) {
      console.log(error)
    }finally{
      toast.dismiss(toastId)
    }
  }
async function clearCart() {
  let toastId=toast.loading("Clear cart.......")
  try {
    const options={
    url:"https://ecommerce.routemisr.com/api/v1/cart",
    method:"DELETE",
    headers:{
      token
    }
  }
  let {data}=await axios.request(options);
  console.log(data)
  if(data.message==="success"){
    
    toast.success("Cart has been cleared")
    setCartInfo({
      numOfCartItems:0
    })
  }
    
  } catch (error) {
    console.log(error)
  }finally{
  toast.dismiss(toastId)
  }
}
async function updateProductCount({productId,count}) {
  try {
    const options={
      url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      method:"PUT",
      headers:{
        token
      },
      data:{
        count
      }
    }
    let {data}= await axios.request(options) ;
    console.log(data)   
    if(data.status === "success"){
      setCartInfo(data)
    }
  } catch (error) {
    console.log(error)
    
  }
  
}
  return (
    <CartContext.Provider 
    value={{ addProductToCart
     ,getCartProducts
     ,cartInfo,removeProductFromCart
     ,clearCart,updateProductCount}}>
      {children}
    </CartContext.Provider>
  );
}
