import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import Popup from "../components/Popup.jsx";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setShowLogoutPopup(false);
    setShowDropdown(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setShowDropdown(false);
  };

  // Smooth hover handlers with delay to prevent flickering
  const handleMouseEnter = useCallback(() => {
    // Clear any pending timeout when mouse enters
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setShowDropdown(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Set a 300ms delay before closing the dropdown
    // This allows users to move from button to menu items without closing
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 300);
  }, []);

  // Close dropdown when clicking outside and cleanup timeout
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    // Cleanup: clear the dropdown timeout on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

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

          {/* Right Section - User Profile Dropdown */}
          {user && (
            <div className="flex items-center gap-4">
              {/* User Profile Dropdown */}
              <div 
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Profile Button */}
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200 cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">
                      {user.role === "admin" ? (
                        <span className="text-purple-600 font-semibold">Admin</span>
                      ) : (
                        <span className="text-blue-600 font-semibold">User</span>
                      )}
                    </p>
                  </div>
                  <i className={`fa-solid fa-chevron-down text-xs text-gray-600 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}></i>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Profile Option */}
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition duration-150 text-left font-medium border-b border-gray-100"
                    >
                      <i className="fa-solid fa-user text-blue-500"></i>
                      <span>Profile</span>
                    </button>

                    {/* Logout Option */}
                    <button
                      onClick={() => {
                        setShowLogoutPopup(true);
                        setShowDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 transition duration-150 text-left font-medium"
                    >
                      <i className="fa-solid fa-sign-out-alt text-red-500"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Logout Button */}
              <button
                onClick={() => setShowLogoutPopup(true)}
                className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 font-semibold text-sm"
              >
                <i className="fa-solid fa-sign-out-alt"></i>
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
