import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"

export default function Signup() {
  const navigate =useNavigate()
  let [AccountExistError,setAccountExistError]=useState(null);

async function sendDataToApi(values) {
 const loadingToastId= toast.loading("waiting.......")
  try{
    let options={
      url:"https://ecommerce.routemisr.com/api/v1/auth/signup",
      method:"POST",
      data:values,
    }
    let  {data}=await axios.request(options);

    if(data.message === "success"){
   
   toast.success("success");
   toast.dismiss(loadingToastId);
   setTimeout(() =>{
    navigate("/login")
   },2000)
   
    }
  }catch(error){
    toast.error(error.response.data.message);
setAccountExistError(error.response.data.message)
  }
}





  let validation=Yup.object({
    name:Yup.string().required('name is required').min(3,'name must be mor than 3 characters').max(25,"name can't be more than 25 characters"),
    email:Yup.string().required('email is required').email(),
    password:Yup.string().required('password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'),
    rePassword:Yup.string().required('confirm password is required').oneOf([Yup.ref('password')],'password and repassword should be the same'),
    phone:Yup.string().required(' phone is required').matches(/^(02)?01[0125][0-9]{8}$/,'Sorry,We Accept Egyption Phone Numbers Only'),
  })
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    onSubmit: sendDataToApi
    ,
    validationSchema:validation,
  });

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-xl py-3">Register now:</h1>
        <form className="flex flex-col gap-4 " onSubmit={formik.handleSubmit}>
        <div className="name">
        <input
            type="text "  className="form-control  w-full"
            placeholder="Type your name "
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (<p className="text-red-600 text-sm mt-1">*{formik.errors.name}</p>)}
          
        </div>
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
          {AccountExistError && (<p className="text-red-800 text-sm mt-1">*{AccountExistError}</p>)}
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
          </div>
         <div className="rePassword">
         <input
            type="password" className="form-control w-full"

            placeholder="RePassword "
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (<p className="text-red-600 text-sm mt-1">*{formik.errors.rePassword}</p>)}
         </div>
          <div className="phone">
          <input
            type="tel" className="form-control w-full"

            placeholder="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (<p className="text-red-600 text-sm mt-1">*{formik.errors.phone}</p>)}
          </div>

          <button type="submit" className="btn bg-primary-600 hover:bg-primary-900 w-1/2 mx-auto">Register new account</button>
        </form>
      </div>
    </>
  );
}
