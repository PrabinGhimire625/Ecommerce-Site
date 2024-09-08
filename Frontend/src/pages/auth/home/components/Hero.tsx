import { useEffect, useState } from "react";
import BannerBackground from "../../../.././assets/home-banner-background.png";
import slideshowimage2 from "../../../.././assets/slideshowimage2.png";
import BannerImage from "../../../.././assets/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";
import "../../../../App.css"

const Hero = () => {
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // const images = [ slideshowimage2, BannerImage];

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    //     }, 30000); 
    //     return () => clearInterval(interval); // Clean up interval on component unmount
    // }, []);

    return (
        <div className="relative bg-gray-100">
            <div className="absolute inset-0">
                <img src={BannerBackground} alt="Banner background" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center p-6">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Your Favourite Food Delivered Hot & Fresh
                    </h1>
                    <p className="text-lg md:text-xl text-white mb-6">
                        Healthy switcher chefs do all the prep work, like peeling, chopping & marinating, so you can cook fresh food.
                    </p>
                    <button className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded flex items-center hover:bg-yellow-400">
                        Order Now <FiArrowRight />
                    </button>
                </div>
                <div className="relative" style={{ transform: 'translate(200px, -10px)' }}>
                <img src={BannerImage}  alt="Banner image" className="w-96 md:w-112 mx-auto" />
                </div>
            </div>
            <div className="relative p-4 mt-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center animate-marquee">
                    Free Delivery All Over Nepal: Contact Us at 9822924656
                </h1>
            </div>
        </div>
    );
}

export default Hero;
