import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  return (
    <div className="w-60 bg-gray-800 text-white min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6"></h2>

      <div className="flex flex-col gap-4">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>

        {isAdmin && (
          <>
            <Link to="/createUser" className="hover:bg-gray-700 p-2 rounded">
              Create User
            </Link>

            <Link to="/manageUser" className="hover:bg-gray-700 p-2 rounded">
              Manage Users
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
