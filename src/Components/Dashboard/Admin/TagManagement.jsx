import { Plus, Tag, X } from 'lucide-react';
import React, { useState } from 'react';

const TagManagement = () => {
      const [tags, setTags] = useState([
    "Technology",
    "Travel",
    "Food",
    "Sports",
    "Music",
  ]);
  const [newTag, setNewTag] = useState("");
      const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
    return (
        <div>
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Manage Tags
            </h2>

            {/* Add Tag Form */}
            <div className="mb-6">
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Enter new tag"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag(e);
                      }
                    }}
                  />
                </div>
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Tag
                </button>
              </div>
            </div>

            {/* Tags List */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Available Tags ({tags.length})
              </h3>
              <div className="max-h-64 overflow-y-auto">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{tag}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {tags.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Tag className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p>No tags available. Add some tags to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>
    );
};

export default TagManagement;