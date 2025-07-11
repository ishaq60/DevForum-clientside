import {
  BarChart3,
  Users,
  ShoppingCart,
  CreditCard,
  Settings,
  HelpCircle,
  Menu,
  X,
  Home,
  MessageSquare,
  Calendar,
  ChevronDown,
  Bell,
  Search,
  User,
  FilePlus,
  Files,
  HomeIcon,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import SidebarItem from "./sidebar";
import useAuth from "../../Authentication/UseAuth";
import { FaRegHandPointRight } from "react-icons/fa";
import UseAlluser from "../../Hooks/UseAlluser";
import UseUser from "../../Hooks/UseUser";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const { user } = useAuth();
  const [users]=UseUser()
  console.log(users)
  const isadmin = users?.role==="admin" // Replace with actual role check

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

        <div className="flex items-center gap-4 ml-auto">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
          </button>
          <div className="hidden sm:flex flex-col items-center md:items-start">
            <img
              className="h-8 w-8 rounded-full"
              src={user?.photoURL}
              alt="User avatar"
            />
            <p className="text-sm font-medium">{user?.displayName}</p>
            <p className="text-xs text-gray-200">{users?.
role}</p>
          </div>
          <ChevronDown size={16} className="text-gray-300 mt-2 hidden sm:block" />
          {/* Sidebar toggle button for mobile */}
          <button
            className="md:hidden p-2 text-white hover:bg-indigo-700 rounded"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative fixed top-0 left-0 z-20 h-screen w-64 bg-indigo-800 text-white transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 flex items-center justify-between md:hidden">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={toggleSidebar}>
              <X size={20} />
            </button>
          </div>

          <div className="hidden md:flex items-center justify-between p-4">
            <h2 className="text-xl ml-4 font-bold">{users?.role?.toUpperCase()}</h2>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-lg hover:bg-indigo-700 hidden md:block"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="px-4 space-y-2">
            {isadmin ? (
              <>
                <NavLink to="">
                  {({ isActive }) => (
                    <SidebarItem
                      icon={<Home size={20} />}
                      text="Dashboard"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <NavLink to="manageuser">
                  {({ isActive }) => (
                    <SidebarItem
                      icon={<Users size={20} />}
                      text="Manage Users"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <NavLink to="activities">
                  {({ isActive }) => (
                    <SidebarItem
                      icon={<FaRegHandPointRight size={20} />}
                      text="Activities"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <NavLink to="announcement">
                  {({ isActive }) => (
                    <SidebarItem
                      icon={<Calendar size={20} />}
                      text="Announcement"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <NavLink to="/">
                  {({ isActive }) => (
                    <SidebarItem
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
                      <SidebarItem
                        icon={<Settings size={20} />}
                        text="Settings"
                        expanded
                        active={isActive}
                      />
                    )}
                  </NavLink>

                  <NavLink to="help">
                    {({ isActive }) => (
                      <SidebarItem
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
                <NavLink to="userProfile">
                  {({ isActive }) => (
                    <SidebarItem
                      icon={<User size={20} />}
                      text="My Profile"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <NavLink to="addpost">
                  {({ isActive }) => (
                    <SidebarItem
                      icon={<FilePlus size={20} />}
                      text="Add Post"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <NavLink to="myPost">
                  {({ isActive }) => (
                    <SidebarItem
                      icon={<Files size={20} />}
                      text="My Post"
                      expanded
                      active={isActive}
                    />
                  )}
                </NavLink>

                <NavLink to="/">
                  {({ isActive }) => (
                    <SidebarItem
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
                      <SidebarItem
                        icon={<Settings size={20} />}
                        text="Settings"
                        expanded
                        active={isActive}
                      />
                    )}
                  </NavLink>

                  <NavLink to="help">
                    {({ isActive }) => (
                      <SidebarItem
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
