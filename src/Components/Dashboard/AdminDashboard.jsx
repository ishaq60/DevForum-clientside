import { Calendar, ChevronDown } from 'lucide-react';
import React from 'react';
import AdminHome from './Admin/AdminHome';

const AdminDashboard = () => {
  const admin = true;

  return (
    <div className="p-4 sm:p-6">
      {admin ? (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 w-full max-w-7xl mx-auto">
          <AdminHome />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 w-full max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 text-center lg:text-left">
            User Dashboard
          </h1>
          <div className="flex justify-between gap-6">{/* Add user widgets here */}</div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
