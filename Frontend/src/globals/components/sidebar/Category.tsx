import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../pages/store/hooks';
import { fetchAllCategory } from '../../../pages/store/categorySlice';
import Home from '../../../pages/auth/home/Home';

const Category = () => {
  const dispatch = useAppDispatch();
  const { status, category } = useAppSelector((state) => state.category);
  console.log(status)

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  return (
    <>
    <div className="bg-white">
  <div className="mx-auto max-w-2xl px-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Category</h2>
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

      {
        category.map((cat)=>{
          return(
            <>
              <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img src={`http://localhost:3000/${cat?.categoryImageUrl}`} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
        </div>
        <div className="mt-4 ">
          <div>
            <h3 className="text-md text-gray-70 ml-16 font-bold">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {cat?.categoryName}
              </a>
            </h3>
          </div>
        </div>
      </div>
            </>
          )

        })
      }


    </div>
  </div>
</div>
    </>
  );
}

export default Category;
