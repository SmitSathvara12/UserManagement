import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isAdmin = user?.role === "admin";

  const activeClass = (path) =>
    location.pathname === path ? "bg-gray-700 p-2 rounded" : "hover:bg-gray-700 p-2 rounded";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed md:static top-0 left-0 h-screen w-60 bg-gray-800 text-white p-5 
        transform transition-transform duration-300 z-50 overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6">UserModule</h2>

        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className={activeClass("/")}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>

          {isAdmin && (
            <>
              <Link
                to="/createUser"
                className={activeClass("/createUser")}
                onClick={() => setIsOpen(false)}
              >
                Create User
              </Link>

              <Link
                to="/manageUser"
                className={activeClass("/manageUser")}
                onClick={() => setIsOpen(false)}
              >
                Manage Users
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;