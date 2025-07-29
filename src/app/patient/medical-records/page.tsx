import React from 'react';

export default function MedicalRecordsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Medical Records</h1>
      <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-xl font-semibold text-blue-700">Your Records</span>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider rounded-tl-lg">Date</th>
              <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Doctor</th>
              <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Summary</th>
              <th className="px-4 py-3 bg-blue-50 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {/* Example records */}
            <tr className="hover:bg-blue-50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">2025-07-20</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">Lab Result</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">Dr. Sarah Johnson</td>
              <td className="px-4 py-3 text-gray-600">Blood test - Normal</td>
              <td className="px-4 py-3">
                <button className="text-blue-600 hover:text-blue-800 font-medium mr-2">View</button>
                <button className="text-green-600 hover:text-green-800 font-medium mr-2">Download</button>
                <button className="text-gray-500 hover:text-gray-700 font-medium">Share</button>
              </td>
            </tr>
            <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">2025-06-10</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">Prescription</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">Dr. Michael Chen</td>
              <td className="px-4 py-3 text-gray-600">Amoxicillin 500mg</td>
              <td className="px-4 py-3">
                <button className="text-blue-600 hover:text-blue-800 font-medium mr-2">View</button>
                <button className="text-green-600 hover:text-green-800 font-medium mr-2">Download</button>
                <button className="text-gray-500 hover:text-gray-700 font-medium">Share</button>
              </td>
            </tr>
            <tr className="hover:bg-blue-50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">2025-05-02</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">Consultation</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">Dr. Emily Lee</td>
              <td className="px-4 py-3 text-gray-600">Routine checkup</td>
              <td className="px-4 py-3">
                <button className="text-blue-600 hover:text-blue-800 font-medium mr-2">View</button>
                <button className="text-green-600 hover:text-green-800 font-medium mr-2">Download</button>
                <button className="text-gray-500 hover:text-gray-700 font-medium">Share</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
