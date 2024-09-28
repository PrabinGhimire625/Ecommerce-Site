import React from 'react';
import { Link } from 'react-router-dom';

const ProfileSidebar = () => {
  return (
    <div className="w-full p-6  rounded-lg ">
      <h2 className=" ml-5 text-2xl font-semibold mb-6  text-blue-600">Hello, Raju</h2>

      <div className="flex items-center ml-5 ">
        
      <span className="bg-green-600 text-white rounded-full text-md py-1 px-4">Verified</span>

      </div>

      <ul className="space-y-4">

        {/* manage my account */}
        <li className="relative">
          <Link to="/manageMyAccount" className="block bg-transparent text-lg font-bold hover:bg-transparent text-black hover:text-blue-600 py-3 px-4 rounded-lg">
            Manage My Account
          </Link>
          <div className="flex flex-col ml-8  text-lg text-gray-700">
            <Link to="/profile">Profile</Link>
            <Link to="/addressBook">Address Book</Link>
            <p>My Payment Option</p>
          </div>
        </li>

        {/* my orders */}
        <li className="relative">
          <Link to="/orderHistory" className="block bg-transparent text-lg font-bold hover:bg-transparent text-blue-900 hover:text-blue-600 py-3 px-4 rounded-lg">
            My Orders
          </Link>
          <div className="flex flex-col ml-8 text-lg text-gray-700">
            <p>My Return</p>
            <p>My Cancellation</p>
          </div>
        </li>


         {/* my Reviews */}
         <li className="relative">
          <Link to="/orderHistory" className="block bg-transparent text-lg font-bold hover:bg-transparent text-black hover:text-blue-600 pt-3 px-4 rounded-lg">
            My Reviews
          </Link>
        </li>

          {/* my wishList */}
          <li className="relative">
          <a href="#" className="block bg-transparent text-lg font-bold hover:bg-transparent text-black hover:text-blue-600 px-4 rounded-lg">
            My wishList
          </a>
        </li>

        {/* Add other list items as needed */}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
