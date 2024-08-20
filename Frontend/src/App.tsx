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
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/product/:id' element={<SingleProduct/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/myOrders' element={<MyOrders/>}/>
          <Route path='/myOrders/:id' element={<OrderDetails/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
