import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import Popup from "../components/Popup.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setShowLogoutPopup(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Left Section - Logo/Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
              <i className="fa-solid fa-users"></i>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 hidden sm:block">
              UserModule
            </h1>
          </div>

          {/* Right Section - User Info & Logout */}
          {user && (
            <div className="flex items-center gap-4">
              {/* User Info */}
              <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">
                    {user.role === "admin" ? (
                      <span className="text-purple-600 font-semibold">Admin</span>
                    ) : (
                      <span className="text-blue-600 font-semibold">User</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => setShowLogoutPopup(true)}
                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 font-semibold text-sm sm:text-base"
              >
                <i className="fa-solid fa-sign-out-alt"></i>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Popup */}
      <Popup
        isOpen={showLogoutPopup}
        onClose={() => setShowLogoutPopup(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to logout from your account?"
        confirmText="Logout"
        confirmColor="red"
      />
    </>
  );
};

export default Navbar;
