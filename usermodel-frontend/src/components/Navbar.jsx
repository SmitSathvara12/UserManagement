import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import Popup from "../components/Popup";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    Navigate("/login");
  };
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold"></h1>

      <button
        onClick={() => setShowLogoutPopup(true)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>

      <Popup
        isOpen={showLogoutPopup}
        onClose={() => setShowLogoutPopup(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        confirmColor="red"
      />
    </div>
  );
};

export default Navbar;
