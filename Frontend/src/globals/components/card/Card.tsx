import React from 'react'
import { Product } from '../../types/productTypes'
import { Link } from 'react-router-dom'

interface CardProps {
  data: Product
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <Link to={`/product/${data.id}`}>
      <div className="max-w-xs mx-auto mt-3 w-64 bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="relative w-full h-64">
          <img
            src={`http://localhost:3000/${data.productImageUrl}`}
            className="w-full h-full object-contain"
            alt="product image"
          />
        </div>
        <div className="p-5 h-40 flex flex-col justify-between">
          <h3 className="text-gray-900 font-semibold text-lg tracking-tight dark:text-white">
            {data?.productName}
          </h3>
          <div className="flex items-center mt-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              5.0
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              Rs. {data.productPrice} <span className="text-sm text-red-500 ml-10">-87%</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
