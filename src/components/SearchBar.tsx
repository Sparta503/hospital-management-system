// src/app/patient/dashboard/components/SearchBar.tsx
import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="flex justify-center w-full mb-8 px-4">
      <div className="relative w-full max-w-2xl group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-70 group-hover:opacity-100 blur-sm transition-all duration-300 group-hover:duration-200 animate-pulse"></div>
        <div className="relative flex items-center bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-5 py-4 bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-400 transition-all duration-300"
            placeholder="Search appointments, records, and more..."
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
            Search
          </button>
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-10"></div>
      </div>
    </div>
  );
};

export default SearchBar;