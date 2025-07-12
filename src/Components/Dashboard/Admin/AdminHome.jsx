import React, { useState } from "react";

import { User, Mail, Phone, Plus, X, Tag } from "lucide-react";
import UseUser from "../../../Hooks/UseUser";
import Usetotaluser from "../../../Hooks/UseTotaluser";
import UseTotalPostcom from "../../../Hooks/UseTotalPostcom";
import AdminProfile from "./AdminProfile";
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
  // Sample admin data

  // Data for pie chart
 


if (isLoading || !data) return <LoadingSppiner />;

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-600 mt-2">
            Manage your site content and settings
          </p>
        </div>

        {/* Admin Profile Section */}
        <AdminProfile data={data} user={user} totaluser={totaluser}></AdminProfile>
    

        {/* Charts and Tags Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
        <Piechar totalComments={totalComments} totalPosts={totalPosts} totaluser={totaluser}></Piechar>

          {/* Tag Management */}
         <TagManagement></TagManagement>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
