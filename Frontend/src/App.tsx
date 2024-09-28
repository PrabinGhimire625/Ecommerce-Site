import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Provider } from "react-redux" 
import store from "./pages/store/store"
import Home from "./pages/auth/home/Home"
import Register from "./pages/auth/register/Register"
import Login from "./pages/auth/login/Login"
import Navbar from "./globals/components/navbar/Navbar"
import SingleProduct from "./pages/auth/singleProduct/SingleProduct"
import Cart from "./pages/cart/Cart"
import Checkout from "./pages/checkout/Checkout"
import MyOrders from "./pages/orders/MyOrders"
import OrderDetails from "./pages/orders/OrderDetails"
import Profile from "./pages/auth/profile/Profile"
import Hero from "./pages/auth/home/components/Hero"
import Category from "./globals/components/sidebar/Category"
import Landing from "./pages/landing/Landing"
import Review from "./pages/review/Review"
import OrderHistory from "./pages/orders/OrderHistory"
import EditProfile from "./pages/auth/profile/editProfile/EditProfile"
import ProfileSidebar from "./pages/auth/profile/ProfileSidebar"
import ManageMyAccount from "./pages/auth/profile/ManageMyAccount"
import AddressBook from "./pages/auth/profile/AddressBook"



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/hero' element={<Hero/>}/>
          <Route path='/review/:id' element={<Review/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/editProfile' element={<EditProfile/>}/>
          <Route path='/profileSidebar' element={<ProfileSidebar/>}/>
          <Route path='/product/:id' element={<SingleProduct/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/myOrders' element={<MyOrders/>}/>
          <Route path='/category' element={<Category/>}/>
          <Route path='/category' element={<Category/>}/>
          <Route path='/orderHistory' element={<OrderHistory/>}/>
          <Route path='/manageMyAccount' element={<ManageMyAccount/>}/>
          <Route path='/addressBook' element={<AddressBook/>}/>
          <Route path='/orderDetails' element={<OrderDetails/>}/>
          <Route path='/myOrders/:id' element={<OrderDetails/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
