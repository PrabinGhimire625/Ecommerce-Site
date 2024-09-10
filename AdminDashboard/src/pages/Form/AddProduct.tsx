import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { APIAuthenticated } from "../../http";
import { AddProducts, addProduct} from "../../store/dataSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Status } from "../../types/status";
import { useNavigate } from "react-router-dom";

export interface Category{
  id: string,
  categoryName: string
}



const AddProduct = () => {
  const navigate=useNavigate()
  const dispatch = useAppDispatch();
  const  {status} =useAppSelector((state)=>state.datas)

  const [category, setCategory] = useState<Category[]>([]);

  //call this fethCategory in the useEffect
  const fetchCategory = async () => {
    const response = await APIAuthenticated.get("/admin/category");
    console.log(response)
    if (response.status === 200) {
      setCategory(response.data.data);
    } else {
      setCategory([]);
    }
  };

  const [productData, setProductData] = useState<AddProducts>({
    productName: "",
    productDescription: "",
    productPrice: 0,
    productTotalStockQty: 0,
    image: null,
    categoryId: ""
  });
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const errorMessageStyle = {
    color: "red",
    marginLeft: "50px",
    marginTop: "10px"
  };


  useEffect(() => {
    fetchCategory();
  },[]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement
    setProductData({
      ...productData,
      [name]:name=="image" ? files?.[0] : value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addProduct(productData));
    if (status === Status.SUCCESS) {
      alert("Successfully added the product");
      navigate("/tables")
    } else {
      setErrorMessage("Product is not added!");
    }
  };
  console.log(productData)
  console.log(category)

  return (
    <>
      <div className="bg-white rounded-lg shadow relative m-10">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Add product</h3>
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
                <label htmlFor="productName" className="text-sm font-medium text-gray-900 block mb-2">Product Name</label>
                <input onChange={handleChange} type="text" name="productName" id="productName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Apple Imac 27" required/>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="categoryId" className="text-sm font-medium text-gray-900 block mb-2">Category</label>
                <select name="categoryId" id="categoryId" onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required>
                  {category.length > 0 && category.map((ctgy) => (
                    <option key={ctgy.id} value={ctgy.id}>{ctgy.categoryName}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="productTotalStockQty" className="text-sm font-medium text-gray-900 block mb-2">Total stock quantity</label>
                <input onChange={handleChange} type="text" name="productTotalStockQty" id="productTotalStockQty" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="50" required/>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="productPrice" className="text-sm font-medium text-gray-900 block mb-2">Price</label>
                <input onChange={handleChange} type="number" name="productPrice" id="productPrice" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Rs2300" required/>
              </div>
              <div className="col-span-full">
                <label htmlFor="productDescription" className="text-sm font-medium text-gray-900 block mb-2">Product Description</label>
                <textarea onChange={handleChange} name="productDescription" id="productDescription" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Details" required></textarea>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="image" className="text-sm font-medium text-gray-900 block mb-2">Image</label>
                <input   onChange={handleChange}   type="file"   name="image"   id="image"   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"   required  />
              </div>

            </div>

            <div className="p-6 rounded-b">
              <button type="submit" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Product</button>
            </div>
            {errorMessage && <p className="error-message" style={errorMessageStyle}>{errorMessage}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
