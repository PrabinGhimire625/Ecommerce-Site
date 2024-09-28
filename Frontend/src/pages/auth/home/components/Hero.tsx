import { useEffect, useState } from "react";
import "../../../../App.css";

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        "https://blog.daraz.com.np/wp-content/uploads/2024/02/1200x450_2.png", 
        "https://blog.daraz.com.np/wp-content/uploads/2023/07/What-is-Daraz-MBB1200x450.jpg",
        "https://blog.daraz.com.bd/wp-content/uploads/2023/09/daraz-ebl-co-brand-card.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change images every 3 seconds
        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [images.length]);

    return (
      <>
        <div className="animate-slide-left-right ">
          <h1 className="text-4xl font-bold text-red-700 text-center my-1">Free delivery all over Nepal</h1>
        </div>

        <div className="flex justify-center bg-gray-100 ">
            {/* Main slideshow background container */}
            <div
                className="main w-[1100px] h-[450px] bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
            >
                {/* Optional content inside the slideshow container */}
                <div className="flex justify-center items-center h-full">
                    <h1 className="text-white text-4xl font-bold">Welcome to Our HD Image Background</h1>
                </div>
            </div>

            {/* Second section with call-to-action */}
            <div className="bg-gradient-to-b from-gray-100  to-gray-300 flex flex-col max-w-md h-[450px] p-6 rounded-xl shadow-2xl">
                <h1 className="text-2xl font-extrabold text-center text-indigo-700">Download the App</h1>
               
                <div 
                    className="main w-60 h-60 bg-cover bg-center rounded-lg shadow-lg mt-6"
                    style={{ backgroundImage: 'url("https://pbs.twimg.com/media/FjVrMAXVsAECWsb.jpg")' }}
                ></div>

                <div className="flex flex-col items-center space-y-3 mt-6">
                    <h1 className="my-4 text-lg font-bold text-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-4 rounded-full shadow-md hover:scale-105 transform transition-transform">
                        App Store
                    </h1>
                </div>
            </div>
        </div>
        </>
    );
};

export default Hero;
