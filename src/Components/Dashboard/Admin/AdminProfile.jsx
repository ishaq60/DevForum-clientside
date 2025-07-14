import { Mail, User } from 'lucide-react';
import React from 'react';

const AdminProfile = ({data,user,totaluser}) => {
    return (
        <div>
            <div className="bg-white rounded-xl shadow-sm border mt- border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Admin Profile
          </h2>

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
                  <p className="text-2xl font-bold text-blue-700">
                    {data?.totalPosts}
                  </p>
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
                  <p className="text-2xl font-bold text-green-700">
                    {data?.totalComments}
                  </p>
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
                  <p className="text-2xl font-bold text-yellow-700">
                    {totaluser}
                  </p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-full">
                  <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
};

export default AdminProfile;