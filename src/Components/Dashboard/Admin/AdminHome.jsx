import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { User, Mail, Phone, Plus, X, Tag } from 'lucide-react';
import UseUser from '../../../Hooks/UseUser';
import Usetotaluser from '../../../Hooks/UseTotaluser';

const AdminHome = () => {
  const [tags, setTags] = useState(['Technology', 'Travel', 'Food', 'Sports', 'Music']);
  const [newTag, setNewTag] = useState('');

  const  [user]=UseUser()
  const [totaluser]=Usetotaluser()
  console.log(user)
  // Sample admin data
  const adminData = {
    name: 'John Mitchell',
    email: 'john.mitchell@admin.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    posts: 45,
    comments: 128,
    users: 1250
  };

  // Data for pie chart
  const chartData = [
    { name: 'Posts', value: adminData.posts, color: '#3B82F6' },
    { name: 'Comments', value: adminData.comments, color: '#10B981' },
    { name: 'Users', value: adminData.users, color: '#F59E0B' }
  ];

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-sm text-gray-600">Count: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
         
          <p className="text-gray-600 mt-2">Manage your site content and settings</p>
        </div>

        {/* Admin Profile Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Admin Profile</h2>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img 
                src={user?.image} 
                alt="Admin Profile" 
                className="w-24 h-24 rounded-full border-4 border-blue-100 object-cover"
              />
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Total Posts</p>
                  <p className="text-2xl font-bold text-blue-700">{adminData.posts}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Total Comments</p>
                  <p className="text-2xl font-bold text-green-700">{adminData.comments}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600">Total Users</p>
                  <p className="text-2xl font-bold text-yellow-700">{totaluser}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-full">
                  <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tags Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Site Statistics</h2>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry) => (
                      <span style={{ color: entry.color }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tag Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Manage Tags</h2>
            
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
                      if (e.key === 'Enter') {
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
              <h3 className="text-sm font-medium text-gray-700 mb-3">Available Tags ({tags.length})</h3>
              <div className="max-h-64 overflow-y-auto">
                {tags.map((tag, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
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
      </div>
    </div>
  );
};

export default AdminHome;