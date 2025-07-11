import { Calendar, ChevronDown } from 'lucide-react';
import React from 'react';
import AdminHome from './Admin/AdminHome';

const AdminDashboard = () => {
  const admin=true
  return (
   
 <div className="p-6 mr-20">
 {
  admin?(
      <div className="flex w-max-7xl mx-auto items-center gap-x-36  justify-between mb-8">
            
            <AdminHome></AdminHome>
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