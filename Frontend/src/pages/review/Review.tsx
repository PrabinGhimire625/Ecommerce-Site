import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { fetchSingleProduct } from "../store/productSlice";
import { AddReview, addReview } from "../store/reviewSlice";

const Review = () => {
    const { id } = useParams();
    const { singleProduct } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    // State for the selected rating
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0); 
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleProduct(id));
        }
    }, [id, dispatch]);

    //handleSubmit
    const handleSubmit = () => {
        if (rating === 0) {
            alert("Please select a rating before submitting!");
            return;
        }
        if (!singleProduct?.id) {
            alert("Product ID is not available!");
            return;
        }
        const reviewData: AddReview = {
            productId: singleProduct.id, 
            rating,
            message,
        };
    
        dispatch(addReview(reviewData));
        alert(`Review submitted with a rating of: ${rating}`);
    };
    
    return (
        <>
            <div className="bg-gray-100">
                <div className="flex max-lg:flex-col items-center py-5 gap-8 lg:gap-24 px-3 md:px-11">
                    <div className="grid grid-cols-4 w-full">
                        <div className="col-span-4 sm:col-span-1">
                            <img
                                src={`http://localhost:3000/${singleProduct?.productImageUrl}`}
                                alt=""
                                className="max-sm:mx-auto object-cover"
                            />
                        </div>
                        <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                            <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
                                {singleProduct?.productName}
                            </h6>
                           
                            <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                                <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                                    Shipping Address
                                </span>
                                <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                                    Qty
                                </span>
                                <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">
                                    Price
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="pt-5 relative">
                    <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
                        <div className="pb-8 border-b border-gray-200 max-xl:max-w-3xl max-xl:mx-auto">
                            <h4 className="font-manrope font-semibold text-3xl leading-10 text-black mb-6">
                                Write your review
                            </h4>

                            <div className="flex sm:items-center flex-col sm:flex-row justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {/* Star Rating System */}
                                    {[...Array(5)].map((_, index) => (
                                        <svg
                                            key={index}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                            viewBox="0 0 30 30"
                                            fill="none"
                                            className="cursor-pointer"
                                            onClick={() => setRating(index + 1)}
                                            onMouseEnter={() => setHover(index + 1)}
                                            onMouseLeave={() => setHover(rating)}
                                        >
                                            <g clipPath="url(#clip0_13624_2974)">
                                                <path
                                                    d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                                                    fill="#FBBF24"
                                                    className={`transition-colors duration-300 ${
                                                        (hover || rating) > index
                                                            ? 'fill-yellow-400'
                                                            : 'fill-gray-300'
                                                    }`}
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_13624_2974">
                                                    <rect
                                                        width="30"
                                                        height="30"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            {/* Text Area for Review Message */}
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your review here..."
                                rows={4}
                                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none resize-none"
                            ></textarea>

                        </div>

                        <button
                            onClick={handleSubmit}
                            className="rounded-full px-6 py-4 bg-indigo-600 font-semibold text-lg text-white whitespace-nowrap mb-6 w-full text-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400"
                        >
                            Submit review
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Review;
