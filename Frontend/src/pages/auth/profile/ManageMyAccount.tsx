import { useEffect } from "react"
import MyOrders from "../../orders/MyOrders"
import OrderHistory from "../../orders/OrderHistory"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import ProfileSidebar from "./ProfileSidebar"
import { fetchMyOrder, fetchMyOrderDetails } from "../../store/CheckoutSlice"
import { Link } from "react-router-dom"

const ManageMyAccount = () => { 

    const dispatch=useAppDispatch()
    const {myOrders}=useAppSelector((state)=>state.orders)

    useEffect(()=>{
        dispatch(fetchMyOrder())

    },[])
    console.log(myOrders)

  return (
    <>
    <div className="bg-gray-100">
        <div className="py-8">
            {/* Flexbox container for sidebar and content */}
            <div className="flex space-x-6">
                {/* Profile Sidebar Component */}
                <div className="w-1/5 w-fit">
                    <ProfileSidebar />
                </div>

            {/* section start here */}
            <section className="w-4/5 pt-5 bg-gray-100">
            {
                myOrders.length>0 && myOrders.map((order)=>{
                return(
                    <div key={order?.id} className="flex justify-center">
                    <div className="bg-white w-1/3 p-4">
                        <h2 className="text-black text-lg font-bold">Personal Profile |<Link to="/editProfile" className="text-blue-300">  edit</Link></h2>
                        <p className="text-black">{order?.User?.username}</p>
                        <p className="text-black">{order?.User?.email}</p>
                        <div className="mt-4">
                            <label className="text-black">
                                <input type="checkbox" className="mr-2" />
                                Receive marketing SMS
                            </label>
                        </div>
                        <div className="mt-2">
                            <label className="text-black">
                                <input type="checkbox" className="mr-2" />
                                Receive marketing emails
                            </label>
                        </div>
                    </div>



                    <div className="flex justify-center items-center bg-white flex-grow ml-4 relative">
                        {/* Vertical line in the middle */}
                        <div className="absolute h-full border-l-2 border-gray-500" style={{ left: '50%', height: '80%' }}></div>

                        {/* Left Column (Default Shipping Address) */}
                        <div className="w-1/2 ml-10 text-left">
                            <h3 className="text-lg">Address Book |<span className="text-blue-300">  edit</span></h3>
                            <h4 className="text-lg">EDIT DEFAULT SHIPPING ADDRESS</h4>
                            <p className="font-bold">{order?.User?.username}</p>
                            <p>{order?.shippingAddress}</p>
                          
                            <p>(+977) {order?.phoneNumber}</p>
                        </div>

                        {/* Right Column (Default Billing Address) */}
                        <div className="w-1/2 pl-8 text-left">
                            <h4 className="">DEFAULT BILLING ADDRESS</h4>
                            <p className="font-bold">{order?.User?.username}</p>
                            <p>{order?.shippingAddress}</p>
                            <p>(+977) {order?.phoneNumber}</p>
                        </div>
                    </div>

                </div>

                )
                })


            }
                
                <div className="bg-white mt-5">
                    <MyOrders/>
                </div>
            </section>

            </div>
         </div>
    </div>                                 

    </>
  )
}

export default ManageMyAccount
