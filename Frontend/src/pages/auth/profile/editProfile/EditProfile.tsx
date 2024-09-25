import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ProfileSidebar from '../ProfileSidebar';
import { fetchUserProfile, updateUser } from '../../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { Status } from '../../../../globals/types/types';

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userProfile, status } = useAppSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    if (userProfile) {
      setUserData({
        username: userProfile.username,
        email: userProfile.email,
      });
    }
  }, [userProfile]);

  useEffect(() => {
    dispatch(fetchUserProfile()); // Ensure profile data is fetched
  }, [dispatch]);

  // Handle change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userProfile?.id) {
      dispatch(updateUser(userData, userProfile?.id)).then(() => {
        if (status === Status.SUCCESS) {
          alert("User is updated successfully!");
        } else {
          alert("User is not updated successfully!");
        }
      });
    }
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 px-4">
            {/* Profile Sidebar Component */}
            <div className="col-span-1">
              <ProfileSidebar />
            </div>

            {/* User update */}
            <div className="col-span-3">
              <section className="bg-white shadow-sm p-6 rounded-lg">
                <div className="flex flex-col items-center px-6 py-8 mx-auto  lg:py-0">
                  <div className="w-full bg-gray-100 my-10 rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-10">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Edit your details
                      </h1>
                      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div>
                          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Username
                          </label>
                          <input
                            value={userData.username}
                            onChange={handleChange}
                            type="text"
                            name="username"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your email
                          </label>
                          <input
                            value={userData.email}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Update details
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
