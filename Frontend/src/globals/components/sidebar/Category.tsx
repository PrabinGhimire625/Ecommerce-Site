import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../pages/store/hooks';
import { fetchAllCategory } from '../../../pages/store/categorySlice';
import Home from '../../../pages/auth/home/Home';

const Category = () => {
  const dispatch = useAppDispatch();
  const { status, category } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-blue-100">
     
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white min-h-screen">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 bg-white">
            {/* Category Link (Bold) */}
            <Link to="/" className="flex items-center px-4 py-2 text-xl font-bold text-black hover:bg-gray-200">
              Category
            </Link>

            {/* Dynamic Category Links */}
            {category.map((cat) => (
              <Link 
              key={cat.id} 
              to={`/categories/${cat.id}`} 
              className="flex items-center px-4 py-2 text-gray-700 hover:text-red-500 transition-colors duration-300 rounded-md hover:bg-gray-200"
            >
              <span className="mr-2 text-lg font-semibold">{'<'}</span>
              <span className="text-lg font-medium">{cat.categoryName}</span>
            </Link>
            
            ))}
          </nav>

          
        </div>
      </div>
 
      
    </div>
  );
}

export default Category;
