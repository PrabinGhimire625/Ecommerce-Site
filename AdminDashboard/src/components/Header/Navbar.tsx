import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUserLogout } from '../../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const {status,token}=useAppSelector((state)=>state.auth)
  console.log(token)
  const [isloggedIn, setIsLoggedIn]=useState<boolean>(false)
  const dispatch=useAppDispatch()
  const navigate=useNavigate()
  
  useEffect(()=>{
    const localStorageToken=localStorage.getItem('token')
    setIsLoggedIn(!!localStorageToken || !! token)
  },[token])

  const handleLogout=()=>{
    localStorage.clear()
    dispatch(setUserLogout())
    navigate("/login")
  }
  
  return (
   <>
   <div className="flex space-x-4">
   {
    !isloggedIn ? (
     <Link to='/login'>
        <button className="bg-blue-500 text-white px-4 py-1.5 h-10 rounded flex items-center justify-center hover:bg-blue-600 transition duration-300">Login</button>
      </Link>
   ):(
    <>
      <button  onClick={handleLogout}className="bg-red-500 text-white px-4 py-1.5 h-10 rounded flex items-center justify-center hover:bg-red-600 transition duration-300">Logout </button>
        <Link to='/profile'>
  <button className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-600 transition duration-300"><span className="text-lg">P</span> </button>
        </Link>
    </>
   )
  }
</div>


   </>
  );
};

export default Navbar;
