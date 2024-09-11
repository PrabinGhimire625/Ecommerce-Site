import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchSingleCategory, updateCategory } from '../../../store/dataSlice';
import { Status } from '../../../types/status';

const UpdateCategory = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate=useNavigate()
  const { singleCategory,status } = useAppSelector((state) => state.datas);
  console.log(singleCategory);

  const [categoryData, setCategoryData] = useState({
    categoryName: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleCategory(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleCategory) {
      setCategoryData({
        categoryName: singleCategory.categoryName || '',
      });
    }
  }, [singleCategory]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {  // Ensure id is available
      await dispatch(updateCategory(categoryData, id)); 
      if (status === Status.SUCCESS) {
        alert("Successfully added the category");
        navigate("/tables")
      } else {
        setErrorMessage("Category is not added!");
      } // Pass id as a parameter
    } else {
      console.error('Category ID is missing.');
    }
  };
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const errorMessageStyle = {
    color: "red",
    marginLeft: "50px",
    marginTop: "10px"
  };

  console.log(categoryData);

  return (
    <>
      <div className="bg-white rounded-lg shadow relative m-10">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Edit Category</h3>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="product-modal">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="categoryName" className="text-sm font-medium text-gray-900 block mb-2">Category Name</label>
                <input type="text" onChange={handleChange} name="categoryName" value={categoryData.categoryName} id="categoryName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required />
              </div>
            </div>
            <div className="p-6 rounded-b">
              <button type="submit" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update Category</button>
            </div>
            {errorMessage && <p className="error-message" style={errorMessageStyle}>{errorMessage}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
