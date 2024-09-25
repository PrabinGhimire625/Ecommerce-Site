import ProfileSidebar from "./ProfileSidebar"

const ManageMyAccount = () => { 
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
            <section className="w-4/5 pt-5 bg-white">
    <div className="flex justify-center">
        <div className="bg-green-500 w-1/4 h-36">Div 1</div>
        <div className="bg-green-500 flex-grow h-36 ml-4">Div 2</div>
    </div>
</section>

            </div>
         </div>
    </div>                                 

    </>
  )
}

export default ManageMyAccount
