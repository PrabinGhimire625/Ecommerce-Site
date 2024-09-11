import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { useEffect } from "react";
import { fetchSingleOrder } from "../../store/dataSlice";

const SingleOrder = () => {
    const {id}=useParams()
    console.log(id)
    const dispatch=useAppDispatch();
    const {singleOrder:[order]} = useAppSelector((state)=>state.datas)
    console.log(order)
    useEffect(()=>{
        if(id){
            dispatch(fetchSingleOrder(id))
        }
    },[])



  return (
    <div className="py-20 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
    
    <div className="flex justify-start item-start space-y-5 flex-col">
      <h1 className="text-1xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-600">Order {id}</h1>
      <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{order?.createdAt}</p>
    </div>
    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
      <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
        <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
          <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">My Order</p>
   
              <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
              <div className="pb-4 md:pb-8 w-full md:w-40">
                <img className="w-full hidden md:block"   src={`http://localhost:3000/${order?.Product?.productImageUrl}`} alt="dress" />
                <img className="w-full md:hidden"  src={`http://localhost:3000/${order?.Product?.productImageUrl}`} alt="dress" />
              </div>
              <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{order?.Product?.productName}</h3>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                  <p className="text-base dark:text-white xl:text-lg leading-6">Rs. {order?.Product?.productPrice} </p>
                  <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">Qty: {order?.quantity} </p>
                  <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Rs.{order?.Product?.productPrice * order?.quantity} </p>
                </div>
              </div>
            </div>
    
   
        </div>
        <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
          <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">

              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white leading-4 text-gray-800">Payment Method</p>
                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{order?.Order?.Payment?.paymentMethod}</p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white leading-4 text-gray-800">Payment Status</p>
                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{order?.Order?.Payment?.paymentStatus}</p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white leading-4 text-gray-800">Order Status</p>
                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{order?.Order?.orderStatus}</p>
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
              <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{100 + order?.quantity * order?.Product?.productPrice}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
            <div className="flex justify-between items-start w-full">
              <div className="flex justify-center items-center space-x-4">
                <div className="w-8 h-8">
                  <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                </div>
                <div className="flex flex-col justify-start items-center">
                  <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">Delivery Charge<br /><span className="font-normal">Delivery with 24 Hours</span></p>
                </div>
              </div>
              <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">Rs 100</p>
            </div>

          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-2 md:p-1 xl:p-8 flex-col" style={{height:'200px'}}>
        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
        <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
    
          <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
              <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">UserName : test</p>
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Address : itahari</p>
                <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">Phone : 9123123</p>
              </div>

            </div>
            <div className="flex w-full justify-center items-center md:justify-start md:items-start">
   
        
       <div style={{display:'flex',flexDirection:'column',padding:'18px'}}>
       <div>
         <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Order Status</label>
          <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
          {/* <option value={filteredOrder?.orderStatus}>{filteredOrder?.orderStatus}</option> */}
          <option value="pending">pending</option>
          <option value="delivered">Delivered</option>
         
          <option value="ontheway">Ontheway</option>
          <option value="preparation">Preparation</option>
          <option value="cancelled">Cancelled</option>
          </select>
         </div>

          <div>
          <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Payment Status</label>
          <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
     
          <option value="pending">pending</option>
          <option value="paid">paid</option>
          <option value="unpaid">unpaid</option>

          </select>
          </div>
       </div>

            </div>
      
            <div className="flex w-full justify-center items-center md:justify-start md:items-start">
              <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800" style={{marginTop:'10px',backgroundColor:'red',color:'white'}} >Delete Order</button>
  
            </div>
              
          </div>
        </div>
      </div>
    </div>
  </div>
    
  )
}

export default SingleOrder