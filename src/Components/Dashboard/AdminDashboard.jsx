import { Calendar, ChevronDown } from 'lucide-react';
import React from 'react';

const AdminDashboard = () => {
  const admin=false
  return (
   
 <div className="p-6 mr-20">
 {
  admin?(
      <div className="flex w-max-7xl mx-auto items-center gap-x-36  justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex justify-between gap-x-36 ">
              <button className="px-4 py-2  bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar
                 size={16} />
                Last 30 Days
                <ChevronDown size={16} />
              </button>
              <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white">
                Download Report
              </button>
            </div>
          </div>
  ):
  <>
  <div className="flex w-max-7xl mx-auto items-center gap-x-36  justify-between mb-8">
            <h1 className="text-2xl font-bold text-center  text-gray-800">User Dashboard</h1>
            <div className="flex justify-between gap-x-36 ">
           
              
            </div>
          </div>
  </>
 }
        
          
          </div>





  );
};

export default AdminDashboard;