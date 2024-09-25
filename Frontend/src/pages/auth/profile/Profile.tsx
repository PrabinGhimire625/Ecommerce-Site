// src/components/Profile.tsx

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteUser, fetchUserProfile, removeUserProfile } from '../../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar'; // Adjust the path as necessary

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userProfile, status } = useAppSelector((state) => state.auth);
  console.log(userProfile);

  useEffect(() => {
    dispatch(fetchUserProfile()); // Fetch user profile data when component mounts
  }, [dispatch]);

  const handleDeleteUser = () => {
    if (userProfile?.id) {
      console.log(userProfile.id);
      dispatch(deleteUser(userProfile.id));
      dispatch(removeUserProfile());
      localStorage.removeItem('token');
      alert("Successfully deleted the user");
      navigate("/register");
    }
  };

  console.log(userProfile);
  console.log(status);

  return (
    <div className="bg-gray-100">
        <div className="py-8">
            {/* Flexbox container for sidebar and content */}
            <div className="flex space-x-6">
                {/* Profile Sidebar Component */}
                <div className="w-1/5 w-fit">
                    <ProfileSidebar />
                </div>

            
                <section className="w-4/5 pt-5 bg-white">
                <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User details
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Details and informations about {userProfile?.username}.
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {userProfile?.username}
                      </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {userProfile?.email}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className='flex gap-5 justify-center my-5'>
                <Link to="/editProfile" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Edit
                </Link>
                <button 
                  onClick={handleDeleteUser} 
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Delete
                </button>
              </div>
            </div>
    </div>
                </section>
            </div>
         </div>
    </div>




  
   
  );
};

export default Profile;
