import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector} from "../store/hooks"
import { Link, useNavigate } from 'react-router-dom'
import { deleteCartItem, updateCartItem } from '../store/cartSlice'

const Cart = () => {
  const navigate=useNavigate()
  const dispatch=useAppDispatch()
  //authSlice bata user token launa useSelector use garnu parxa
  const {items}=useAppSelector((state)=>state.carts)
  console.log(items)

  const handleDelete=(productId:string)=>{
    dispatch(deleteCartItem(productId))
  }

  const handleUpdate=(productId:string, quantity:number)=>{
    dispatch(updateCartItem(productId,quantity))
  }

  // total vanako ya defin garako, 0 vanako total ko inital value 0 rakhna ho , item vanako array bhitra ko obj
  const totalItemInCarts=items.reduce((total,item)=>item?.quantity+total, 0)  //vvi  total quantity in cart
  const totalPriceInCarts=items.reduce((total,item)=>item?.Product?.productPrice*item?.quantity+total, 0)  //total price of cart item
  
  return (
   <>
   <div className="h-screen bg-gray-100 pt-5">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">

       {/* iterate than display the cart items */}
        {
            items.length>0 && items.map((item)=>{
              return(   
        <div  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img src={`http://localhost:3000/${item?.Product?.productImageUrl}`} alt="product-image" className="w-full rounded-lg sm:w-40" />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">{item?.Product?.productName}</h2>
            <p className="mt-1 text-xs text-gray-700">{item?.Product?.Category?.categoryName}</p>
          </div>

          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={()=>handleUpdate(item?.Product?.id, item?.quantity-1)} > - </span>
              <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={item?.quantity} min="1" />
              <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={()=>handleUpdate(item?.Product.id, item?.quantity+1)}> + </span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">{item?.Product?.productPrice}</p>

              {/* delete cartItem */}
              <div onClick={()=>handleDelete(item?.Product?.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>

            </div>
          </div>  
        </div>
      </div>
            )
          })
        }

      </div>
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Total Items</p>
          <p className="text-gray-700">{totalItemInCarts}</p>
        </div>

        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Sub Total</p>
          <p className="text-gray-700">{totalPriceInCarts}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping</p>
          <p className="text-gray-700">Rs 100</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">Rs. {totalPriceInCarts+100}</p>
            <p className="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <Link to="/checkout">
        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
        </Link>
      </div>
    </div>
  </div>

        
   </>
  )
}

export default Cart
