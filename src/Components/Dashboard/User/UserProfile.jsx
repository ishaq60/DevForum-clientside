import { useContext, useEffect, useState } from "react";
import {
  Mail,
  Calendar,
  Award,
  ChevronLeft,
  Settings,
  Share2,
  Edit3,
} from "lucide-react";
import { AuthContext } from "../../../Authentication/AuthProvider";
import UseaxiosPublic from "../../../Hooks/UseaxiosPublic";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = UseaxiosPublic();
  const [suser, setSuser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosPublic.get(`/users/${user?.email}`);
        setSuser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (user?.email) {
      fetchUsers();
    }
  }, [user?.email, axiosPublic]);

  if (!suser)
    return <div className="p-10 text-gray-600">Loading profile...</div>;

  return (
    <div className="bg-gray-50 px-4 sm:px-10 flex justify-center min-h-screen">
      <div className="w-full max-w-6xl">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings size={20} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Edit3 size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

            <div className="p-6 pt-0 relative">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 sm:left-6 sm:transform-none w-32 h-32 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center overflow-hidden">
                {suser?.image ? (
                  <img
                    src={suser.image}
                    alt={suser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-4xl font-bold text-indigo-600">
                      {suser.name?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="ml-0 sm:ml-40 pt-2 mt-20 sm:mt-0">
                <div className="flex flex-col sm:flex-row sm:items-center mb-1">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {suser.name}
                  </h2>
                  <div className="flex ml-0 sm:ml-3 mt-2 sm:mt-0 space-x-2">
                    {suser?.SubscriptionStatus === "Bronze Badge" && (
                      <div className="flex items-center px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                        <Award size={14} className="mr-1" />
                        {suser?.SubscriptionStatus}
                      </div>
                    )}
                    {suser?.isMember && (
                      <div className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        <Award size={14} className="mr-1" />
                        Gold Badge
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 text-gray-600 text-sm break-words">
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2" />
                    {suser.email}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    Joined {suser.joinDate}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Badge Showcase */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">My Badges</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Bronze Badge */}
              <div
                className={`border rounded-lg p-4 flex items-center ${
                  suser
                    ? "border-amber-200 bg-amber-50"
                    : "border-gray-200 bg-gray-50 opacity-50"
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <Award
                    size={32}
                    className={
                      suser.isRegistered ? "text-amber-600" : "text-gray-400"
                    }
                  />
                </div>
                <div>
                  <h4
                    className={`font-bold ${
                      suser ? "text-amber-800" : "text-gray-400"
                    }`}
                  >
                    Bronze Badge
                  </h4>
                  <p className="text-sm text-gray-600">
                    Awarded to registered users
                  </p>
                  <span className="text-xs font-medium">
                    {suser.isRegistered ? (
                      <span className="text-green-600">Unlocked</span>
                    ) : (
                      <span className="text-gray-500">Locked</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Gold Badge */}
              <div
                className={`border rounded-lg p-4 flex items-center ${
                  suser.isMember
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-gray-200 bg-gray-50 opacity-50"
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                  <Award
                    size={32}
                    className={
                      suser.isMember ? "text-yellow-600" : "text-gray-400"
                    }
                  />
                </div>
                <div>
                  <h4
                    className={`font-bold ${
                      suser.isMember ? "text-yellow-800" : "text-gray-400"
                    }`}
                  >
                    Gold Badge
                  </h4>
                  <p className="text-sm text-gray-600">Awarded to members</p>
                  <span className="text-xs font-medium">
                    {suser.isMember ? (
                      <span className="text-green-600">Unlocked</span>
                    ) : (
                      <span className="text-gray-500">Locked</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
