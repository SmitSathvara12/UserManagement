
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-semibold">
       
      </h1>

      <button
        onClick={() => dispatch(logout())}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

    </div>
  );
};

export default Navbar;
