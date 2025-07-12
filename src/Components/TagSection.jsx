import React from 'react';

const TagSection = ({ selectedTag, setSelectedTag }) => {
  const tags = [
    { id: 'all', name: 'All',  },
    { id: 'JavaScript', name: 'JavaScript',  },
    { id: 'Blockchain', name: 'Blockchain',  },
    { id: 'React', name: 'React',  },
    { id: 'Nodejs', name: 'Node.js',  },
    { id: 'MongoDB', name: 'MongoDB',  },
    { id: 'Express', name: 'Express',  },
    { id: 'CSS', name: 'CSS', },
    { id: 'Html', name: 'HTML',  },
    { id: 'technology', name: 'Technology', count: 1 },
  ];

  return (
   <div className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <h2 className="text-lg font-semibold text-gray-700 mb-3">Popular Tags</h2>
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <button
          key={tag.id}
          onClick={() => setSelectedTag(tag.id)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedTag === tag.id
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-indigo-100 hover:text-indigo-800'
          }`}
        >
          #{tag.name.charAt(0).toUpperCase() + tag.name.slice(1)} 
        </button>
      ))}
    </div>
  </div>
</div>

  );
};

export default TagSection;
