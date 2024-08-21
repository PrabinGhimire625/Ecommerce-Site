import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMyOrder } from '../store/CheckoutSlice';
import { Link } from 'react-router-dom';
import { OrderStatus } from '../../globals/types/checkoutTypes';

const MyOrders = () => {
  const dispatch=useAppDispatch();
  const {myOrders} =useAppSelector((state)=>state.orders)
  const [selectedItem,setSelectedItem]=useState<OrderStatus>(OrderStatus.All) //search throught the dropdown of the order status
  const [searchTerm,setSearchTerm]=useState<string>("")   //search through the search bar
  const [date, setDate]=useState<string>("")  //search throught the date

  useEffect(()=>{
    dispatch(fetchMyOrder())
  },[])

  // most usefull code for the searching
  const filterOrders = myOrders.filter((order) => selectedItem === OrderStatus.All || order.orderStatus === selectedItem)  //filter throught the dropdown orderstatus
  .filter((order) =>   //main search 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.Payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.totalAmount.toString().includes(searchTerm)
  )
  .filter((order) => date === "" || new Date(order.createdAt).toLocaleDateString() === new Date(date).toLocaleDateString());  //search through the date


  return (
    <div className="antialiased font-sans bg-gray-200 pt-2">
      <div className="container mx-auto px-4 sm:px-8">
        <div>
          <div>
            <h2 className="text-2xl font-semibold leading-tight">My Orders</h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                {/* search through the orderStatus */}
                <select onChange={(e)=>setSelectedItem(e.target.value as OrderStatus)}
                  className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option value={OrderStatus.All}>all</option>
                  <option value={OrderStatus.Pending}>pending</option>
                  <option value={OrderStatus.Delivered}>delivered</option>
                  <option value={OrderStatus.Ontheway}>ontheway</option>
                  <option value={OrderStatus.Cancel}>cancelled</option>
                  <option value={OrderStatus.Preparation}>preparation</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                  <path
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                  </path>
                </svg>
              </span>

            
            {/* search throught search bar*/}
              <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search" className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
            </div>


            {/* search throught the date */}
            <div className="block relative">
              <input value={date} onChange={(e)=>setDate(e.target.value)} placeholder="Search"  type="date" className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
            </div>

          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      OrderId
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Amt
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order Status
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Ordered At
                    </th>
                  </tr>
                </thead>
                <tbody>


 {/* loop the myorder */} 
                {
  filterOrders.length > 0 && filterOrders.map((order) => {
    return (
      <tr key={order.id}>
    
     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
     <Link to={`/myOrders/${order.id}`}>
          <p className="text-blue-900 whitespace-no-wrap" style={{ textDecoration: 'underline' }}>{order.id}</p>
      </Link>
      </td>
    
     
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{order.totalAmount}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{order.Payment.paymentStatus}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
            <span className="relative">{order.orderStatus}</span>
          </span>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{new Date(order.createdAt).toLocaleDateString()}</p> 
        </td>
      </tr>
    );
  })
}
{/* end loop of my orders */}

                </tbody>
              </table>
              <div
                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
