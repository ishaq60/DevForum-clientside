import React from 'react';

const TagSection = ({tags}) => {
    return (
        <div>
             <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Popular Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-indigo-100 text-gray-800 hover:text-indigo-800 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
        </div>
    );
};

export default TagSection;