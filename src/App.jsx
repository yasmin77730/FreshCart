

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'

import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import GuestRoute from './components/GuestRoute/GuestRoute'
import UserContext from './context/User.context'
import CartProvider, { CartContext } from './context/Cart.context'
import UserProvider from './context/User.context'
import Cart from './pages/Cart/Cart'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Checkout from './pages/Checkout/Checkout'
import Orders from './pages/Orders/Orders'
import Online from './components/Online/Online'
import Offline from './components/Offline/Offline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Products from './pages/Products/Products'
import Brands from './pages/Brands/Brands'
import Categories from './pages/Categories/Categories'



function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        {path:'cart' , element:<Cart/>},
        { path: "product/:id", element: <ProductDetails /> },
        {path:"checkout",element:<Checkout/>},
        {path:"allorders",element:<Orders/>},
        {path:"products", element:<Products/>},
        {path:"brands",element:<Brands/>},
        {path:"categories",element:<Categories/>}


        
      ],
    },
    {
      path: "",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
      ],
    },
  ]);
  let x=new QueryClient();
  return (
    <>

 <QueryClientProvider client={x}>
 <UserProvider>
    <CartProvider>
      <RouterProvider router={router}/>
    </CartProvider>
   </UserProvider>

      <Toaster /> 
    
 </QueryClientProvider>

<Offline>
  
<div className='p-4 rounded-lg fixed right-8 bottom-8 z-50 shadow bg-gray-200 text-gray-600 font-semibold'>
  <i className="fa-solid fa-wifi mr-3"></i>
   <span>Check Your Internet connection</span></div>
</Offline>
    </>
  );
}
export default App
