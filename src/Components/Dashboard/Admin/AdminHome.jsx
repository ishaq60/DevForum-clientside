import React, { useState } from "react";
import { User, Mail, Phone, Plus, X, Tag } from "lucide-react";
import UseUser from "../../../Hooks/UseUser";
import Usetotaluser from "../../../Hooks/UseTotaluser";
import UseTotalPostcom from "../../../Hooks/UseTotalPostcom";
import Piechar from "./Piechar";
import LoadingSppiner from "../../LoadingSppiner";
import TagManagement from "./TagManagement";

const AdminHome = () => {
  const [user] = UseUser();
  const [totaluser] = Usetotaluser();
  console.log(user);

  const { data, isLoading, refetch } = UseTotalPostcom();
  const { totalComments, totalPosts } = data || {};

  console.log("tttt", totalComments);

  if (isLoading || !data) return <LoadingSppiner />;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your site content and settings
          </p>
        </div>

        {/* Charts and Tags Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <Piechar 
              totalComments={totalComments} 
              totalPosts={totalPosts} 
              totaluser={totaluser}
            />
          </div>

          {/* Tag Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <TagManagement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;