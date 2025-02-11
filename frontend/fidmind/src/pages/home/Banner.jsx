import React from 'react';
import PSY2 from "../../assets/books/PSY 2.webp"
import { Link } from'react-router-dom';


const Banner = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src={PSY2}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4 bg-black/50">
        <h1 className="md:text-5xl text-2xl font-medium mb-7">
          Feeding Minds
        </h1>
        <p className="mb-7 max-w-xl">
          Books are more than just pages—they're the
          foundation of lifelong learning and personal growth.
        </p>
        <Link to="/register">
        <button className="btn-primary px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md">
          Get Started
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;

