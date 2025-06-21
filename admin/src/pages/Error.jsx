import React from 'react';
import { Link } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';

const ErrorPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-4 text-center animate-fadeIn">

      <MdErrorOutline className="text-red-500 text-[90px] mb-2 drop-shadow-lg mt-12" />

      <h1 className="text-[100px] font-extrabold text-primary drop-shadow">404</h1>

      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-500 max-w-md mt-4 mb-6">
        The page you're looking for might have been removed or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="px-6 py-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
      >
        ← Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
