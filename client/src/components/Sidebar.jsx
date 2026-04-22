import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isAdmin = user?.role === "admin";

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: "fa-chart-line",
      adminOnly: false,
    },
    {
      path: "/createUser",
      label: "Create User",
      icon: "fa-user-plus",
      adminOnly: true,
    },
    {
      path: "/manageUser",
      label: "Manage Users",
      icon: "fa-users",
      adminOnly: true,
    },
  ];

  const visibleItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col
        transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Logo Section */}
          <div className="mb-8 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                <i className="fa-solid fa-users"></i>
              </div>
              <h2 className="text-2xl font-bold">UserModule</h2>
            </div>
            <p className="text-xs text-gray-400 ml-13 hidden sm:block">User Management System</p>
          </div>


          {/* Navigation Menu */}
          <nav className="px-6 pb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Menu
            </p>
            <div className="flex flex-col gap-2">
              {visibleItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <i className={`fa-solid ${item.icon} text-lg w-5 text-center`}></i>
                  <span className="font-medium">{item.label}</span>
                  {isActive(item.path) && (
                    <div className="ml-auto w-1 h-6 rounded-full bg-white"></div>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Fixed Footer Section */}
        <div className="p-6 border-t border-gray-700 bg-gray-900">
          <p className="text-xs text-gray-400 text-center">
            Version 1.0<br />
            © 2026 UserModule
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;