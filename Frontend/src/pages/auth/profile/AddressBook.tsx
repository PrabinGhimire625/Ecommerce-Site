import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import ProfileSidebar from "./ProfileSidebar"
import { fetchMyOrder} from "../../store/CheckoutSlice"
import { Link } from "react-router-dom"

const AddressBook = () => { 
    const dispatch=useAppDispatch()
    const {myOrders}=useAppSelector((state)=>state.orders)

    useEffect(()=>{
        dispatch(fetchMyOrder())

    },[])
    console.log(myOrders)

  return (
    <>
    <h1>Hello from the adddress book</h1>
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
                    <div className="bg-white mt-5">
                        <div className="antialiased font-sans bg-white pt-2">
                            <div className="container mx-auto px-4 sm:px-8">
                                <div>
                                
                                <div>
                                    <h2 className="text-2xl font-semibold leading-tight">My Orders</h2>
                                </div>
                                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                    <table className="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Fullname
                                                </th>
                                                <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Address
                                                </th>
                                                <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Phone Number
                                                </th>
                                                <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                </th>
                                
                                                <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                           {
                                            myOrders.length>0 && myOrders.map((order)=>{
                                                return(
                                                    <tr key={order?.id}>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <Link to="#">
                                                        <p className="text-blue-900 whitespace-no-wrap">{order?.User?.username}</p>
                                                    </Link>
                                                    </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{order?.User?.email}</p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{order?.phoneNumber}</p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            <span>Deault Billing Address</span><br />
                                                            <span>Deault Billing Address</span>
                                                        </p>
                                                        </td>
                                                        
                                                       
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                                                        <Link to="#" className="text-blue-800 text-sm font-semibold whitespace-no-wrap ">EDIT</Link> 
                                                        </td>
                                                </tr>

                                                )
                                            })
                                           }
                                        </tbody>
                                    </table>

                                    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-end xs:justify-between">
                                        <div className="inline-flex mt-2 xs:mt-0">
                                        <button className="text-sm text-white bg-blue-800 hover:bg-blue-500 text-gray-800 font-semibold py-2 px-4 ">
                                            + add new address
                                        </button>
                                        </div>
                                    </div>

                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
         </div>
    </div>                                 

    </>
  )
}

export default AddressBook
