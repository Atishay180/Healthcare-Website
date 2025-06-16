import React from 'react';

const AlertBox = ({ question = "Are you sure?", onYes, onNo }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-xl shadow-lg w-80 p-6 text-center animate-scale-in">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{question}</h2>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onYes}
            className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
          >
            Yes
          </button>
          <button
            onClick={onNo}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all duration-200"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
