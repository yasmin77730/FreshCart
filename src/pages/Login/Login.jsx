
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"
import { UserContext } from "../../context/User.context";


export default function Login() {
 let {setToken}= useContext(UserContext)
  const navigate =useNavigate()
 const [inCorrectEmailorPasswordError,setinCorrectEmailorPasswordError]=useState(null)

async function sendDataToLogin(values) {
 const loadingToastId= toast.loading("waiting.......")
  try{
    let options={
      url:"https://ecommerce.routemisr.com/api/v1/auth/signin",
      method:"POST",
      data:values,
    }
    let  {data}=await axios.request(options);

    if(data.message === "success"){
      localStorage.setItem('token',data.token);
      console.log(data)
      setToken(data.token)
   
   toast.success("User Logged in successfully");
   toast.dismiss(loadingToastId);
   setTimeout(() =>{
    navigate("/")
   },2000)
   
    }
  }catch(error){
    toast.error(error.response.data.message);
    setinCorrectEmailorPasswordError(error.response.data.message)
  }
}

  let validation=Yup.object({
   
    email:Yup.string().required('email is required').email(),
    password:Yup.string().required('password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'),
    
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: sendDataToLogin
    ,
    validationSchema:validation,
  });

  return (<>
      <div className="container mx-auto">
        <h1 className="text-xl py-3">Register now:</h1>
        <form className="flex flex-col gap-4 " onSubmit={formik.handleSubmit}>
     
          <div className="email">
          <input
            type="email " className="form-control w-full"

            placeholder="Email Address "
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (<p className="text-red-600 text-sm mt-1">*{formik.errors.email}</p>)}
          
          </div>


          <div className="password">
          <input
            type="password" className="form-control w-full"

            placeholder="Password "
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (<p className="text-red-600 text-sm mt-1">*{formik.errors.password}</p>)}
          {inCorrectEmailorPasswordError &&   (<p className="text-red-600 text-sm mt-1">*{inCorrectEmailorPasswordError}</p>)}
          </div>
        
         

          <button type="submit" className="btn bg-primary-600 hover:bg-primary-900 w-1/4 mx-auto">Login</button>
        </form>
      </div>
  </>
  )
}
