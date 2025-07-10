import React, { useState } from "react";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router"; // ✅ Correct import
import useAuth from "../../Authentication/UseAuth"; // ✅ Your custom hook
import { toast } from "react-toastify";
import UseAnnouncement from "../../Hooks/UseAnnouncement";

const Navbar = () => {
  const { user, logOut } = useAuth(); // 

  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
const [announcements]=UseAnnouncement()
  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out");
        setShowDropdown(false); 
        toast.success('User Logout successfully')
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <nav className="bg-indigo-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Site Name */}
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4-8c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" />
            </svg>
          <Link to="/">  <span className="ml-2 text-white text-xl font-bold">DevForum</span></Link>
            <div className="hidden md:flex space-x-6 ml-6">
              <NavLink
                to="/"
                className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </NavLink>
              <NavLink
                to="/membership"
                className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Membership
              </NavLink>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notification */}
            <button className="relative text-white hover:text-indigo-200 p-1 focus:outline-none">
              <FaBell className="h-6 w-6" />
              {announcements.length > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {announcements.length}
                </span>
              )}
            </button>

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.photoURL}
                    alt="User avatar"
                  />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user?.displayName}
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500"
              >
                Join Us
              </Link>
            )}

            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden fixed top-8 left-0 w-64 h-auto bg-indigo-800 shadow-lg z-50 p-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white mb-6"
          >
            <FaTimes size={20} />
          </button>
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-white hover:text-indigo-200 text-lg">
              Home
            </Link>
            <Link
              to="/membership"
              className="text-white hover:text-indigo-200 text-lg"
            >
              Membership
            </Link>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
