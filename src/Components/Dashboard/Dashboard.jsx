import {
  Users,
  Calendar,
  Settings,
  HelpCircle,
  Menu,
  X,
  Home,
  ChevronDown,
  Bell,
  Search,
  User,
  FilePlus,
  Files,
  HomeIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import useAuth from "../../Authentication/UseAuth";
import UseUser from "../../Hooks/UseUser";
import { toast } from "react-toastify";
import Sidebar from "../Dashboard/Sidebar"
export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logOut } = useAuth();
  const [users] = UseUser();

  const isadmin = users?.role === "admin";

  // Redirect logic on mount or user/users changes
  useEffect(() => {
    if (!user || !users) return; // wait for user data

    if (isadmin) {
      navigate("/dashboard/manageuser", { replace: true });
    } else {
      navigate("/dashboard/userProfile", { replace: true });
    }
  }, [user, users, isadmin, navigate]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out");
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-indigo-800 text-white px-4 sm:px-6 md:px-12 py-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 relative z-20">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full max-w-xs text-black">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-0 outline-none ml-2 w-full text-sm"
          />
        </div>

        <div className="flex items-center gap-4 ml-auto relative">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
          </button>

          {/* Profile + Dropdown */}
          <div
            className="hidden sm:flex flex-col items-center md:items-start relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 focus:outline-none"
              aria-haspopup="true"
              aria-expanded={showDropdown}
            >
              <img
                className="h-8 w-8 rounded-full"
                src={user?.photoURL}
                alt="User avatar"
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{user?.displayName}</p>
                <p className="text-xs text-gray-200">{users?.role}</p>
              </div>
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-12 w-48 bg-indigo-800 text-white rounded shadow-md z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-600"
                  onClick={() => navigate("/dashboard/userProfile")}
                >
                  My Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Sidebar toggle button for mobile */}
          <button
            className="md:hidden p-2 text-white hover:bg-indigo-700 rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Mobile Sidebar Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative fixed top-0 left-0 z-20 h-screen w-64 bg-indigo-800 text-white transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 flex items-center justify-between md:hidden">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="hidden md:flex items-center justify-between p-4">
            <h2 className="text-xl ml-4 font-bold">
              {users?.role?.toUpperCase()}
            </h2>
          </div>

          <nav className="px-4 space-y-2">
            {isadmin ? (
              <>
                <NavLink to="" end>
                  {({ isActive }) => (
                    <Sidebar
                      icon={<Home size={20} />}
                      text="Dashboard"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <NavLink to="manageuser">
                  {({ isActive }) => (
                    <Sidebar
                      icon={<Users size={20} />}
                      text="Manage Users"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <NavLink to="announcement">
                  {({ isActive }) => (
                    <Sidebar
                      icon={<Calendar size={20} />}
                      text="Announcement"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <NavLink to="/">
                  {({ isActive }) => (
                    <Sidebar
                      icon={<HomeIcon size={20} />}
                      text="Home"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <div className="mt-8 border-t border-indigo-700 pt-4">
                  <NavLink to="settings">
                    {({ isActive }) => (
                      <Sidebar
                        icon={<Settings size={20} />}
                        text="Settings"
                        expanded
                        active={isActive}
                      />
                    )}
                  </NavLink>

                  <NavLink to="help">
                    {({ isActive }) => (
                      <Sidebar
                        icon={<HelpCircle size={20} />}
                        text="Help"
                        expanded
                        active={isActive}
                      />
                    )}
                  </NavLink>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/dashboard/userProfile">
                  {({ isActive }) => (
                    <Sidebar
                      icon={<User size={20} />}
                      text="My Profile"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <NavLink to="addpost">
                  {({ isActive }) => (
                    <Sidebar
                      icon={<FilePlus size={20} />}
                      text="Add Post"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <NavLink to="myPost">
                  {({ isActive }) => (
                    <Sidebar
                      icon={<Files size={20} />}
                      text="My Post"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <NavLink to="/">
                  {({ isActive }) => (
                    <Sidebar
                      icon={<HomeIcon size={20} />}
                      text="Home"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <div className="mt-8 border-t border-indigo-700 pt-4">
                  <NavLink to="settings">
                    {({ isActive }) => (
                      <Sidebar
                        icon={<Settings size={20} />}
                        text="Settings"
                        expanded
                        active={isActive}
                      />
                    )}
                  </NavLink>

                  <NavLink to="help">
                    {({ isActive }) => (
                      <Sidebar
                        icon={<HelpCircle size={20} />}
                        text="Help"
                        expanded
                        active={isActive}
                      />
                    )}
                  </NavLink>
                </div>
              </>
            )}
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
