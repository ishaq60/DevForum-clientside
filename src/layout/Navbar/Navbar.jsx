import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import useAuth from "../../Authentication/UseAuth";
import { toast } from "react-toastify";
import UseAnnouncement from "../../Hooks/UseAnnouncement";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [announcements] = UseAnnouncement();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out");
        setDropdownOpen(false);
        setMenuOpen(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo & Brand */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" className="text-indigo-200" />
            </svg>
            <span className="font-bold text-xl">DevForum</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 ml-8">
            <NavLink
              to="/"
              className="hover:text-indigo-200 text-sm font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/membership"
              className="hover:text-indigo-200 text-sm font-medium"
            >
              Membership
            </NavLink>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notification */}
          <div className="relative">
            <FaBell className="w-5 h-5 hover:text-indigo-200" />
            {announcements.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-xs rounded-full px-1">
                {announcements.length}
              </span>
            )}
          </div>

          {/* Auth */}
          {user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none"
              >
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full border border-white"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-indigo-800 text-white   rounded shadow z-50">
                  <div className="px-4 py-3 border-b">{user.displayName}</div>
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-2 hover:bg-gray-600 "
                  >
                    Dashboard
                  </Link>
                  <br />
                  <button 
                    onClick={handleLogout}
                    className="px-4 hover:bg-gray-600 "
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-sm"
            >
              Join Us
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-800 px-4 py-4 space-y-4">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-white hover:text-indigo-200 text-lg"
          >
            Home
          </NavLink>
          <NavLink
            to="/membership"
            onClick={() => setMenuOpen(false)}
            className="block text-white hover:text-indigo-200 text-lg"
          >
            Membership
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block text-white justify-center hover:text-indigo-200 text-lg"
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className=" flex-1  space-y-4 text-white hover:text-indigo-200 text-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-white hover:text-indigo-200 text-lg"
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
