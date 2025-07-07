import React from 'react';

const Pageination = () => {
    return (
        <div>
              <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Previous
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                  1
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  2
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  3
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Next
                </button>
              </nav>
            </div>
        </div>
    );
};

export default Pageination;