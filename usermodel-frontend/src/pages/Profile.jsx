import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log("user",user);
  

  if (!user) {
    return (
      <div className="flex min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col md:ml-64">
          <Navbar />
          <div className="flex justify-center items-center flex-1 p-4">
            <div className="text-center">
              <i className="fa-solid fa-user-slash text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 text-lg font-semibold">User not found</p>
              <p className="text-gray-500 text-sm mt-2">Please login to view your profile</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time helper
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isAdmin = user.role === "admin";
  const isActive = user.status === "active";

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {/* Page Header with Back Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                My Profile
              </h1>
              <p className="text-gray-600">View and manage your account information</p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="ml-4 p-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition duration-200 shadow-sm"
              title="Go back"
            >
              <i className="fa-solid fa-arrow-left text-lg"></i>
            </button>
          </div>

          {/* Main Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-4xl mx-auto overflow-hidden">
            {/* Card Header with Avatar - Compact Horizontal Design */}
            <div className="bg-linear-to-br from-indigo-500 via-blue-500 to-blue-600 px-6 sm:px-8 md:px-10 py-6 md:py-7">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {/* Avatar - Compact */}
                <div className="relative shrink-0">
                  {/* Main avatar */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-indigo-300 to-blue-400 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg border-4 border-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  
                  {/* Status indicator dot */}
                  <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-3 border-white flex items-center justify-center ${
                    isActive ? "bg-green-400" : "bg-red-400"
                  }`}>
                    <i className="fa-solid fa-circle text-xs text-white"></i>
                  </div>
                </div>

                {/* User Info - Middle Section */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-0.5 truncate">
                    {user.name || "User"}
                  </h2>
                  <p className="text-indigo-100 text-xs sm:text-sm truncate">
                    {user.email || "No email provided"}
                  </p>
                </div>

                {/* Status and Role Badges - Right Section */}
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-start sm:justify-end shrink-0">
                  {/* Role Badge */}
                  <span className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm whitespace-nowrap ${
                    isAdmin
                      ? "bg-purple-300 bg-opacity-40 text-white border border-purple-300 border-opacity-50"
                      : "bg-blue-300 bg-opacity-40 text-white border border-blue-300 border-opacity-50"
                  }`}>
                    <i className={`fa-solid ${isAdmin ? "fa-crown" : "fa-user"} text-xs`}></i>
                    <span className="hidden sm:inline">{isAdmin ? "Admin" : "User"}</span>
                    <span className="sm:hidden">{isAdmin ? "A" : "U"}</span>
                  </span>

                  {/* Status Badge */}
                  <span className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm whitespace-nowrap ${
                    isActive
                      ? "bg-green-300 bg-opacity-40 text-white border border-green-300 border-opacity-50"
                      : "bg-red-300 bg-opacity-40 text-white border border-red-300 border-opacity-50"
                  }`}>
                    <i className="fa-solid fa-circle text-xs"></i>
                    <span className="hidden sm:inline">{isActive ? "Active" : "Inactive"}</span>
                    <span className="sm:hidden">{isActive ? "On" : "Off"}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Card Body - User Details */}
            <div className="p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-black tracking-widest mb-2">
                      Full Name
                    </label>
                    <p className="text-lg font-semibold text-indigo-600">
                      {user.name}
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-black tracking-widest mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center gap-3 bg-indigo-50 rounded-xl px-4 py-3 border border-indigo-100">
                      <i className="fa-solid fa-envelope text-indigo-600 shrink-0"></i>
                      <p className="text-gray-800 font-medium break-all flex-1">{user.email || "Not provided"}</p>
                      {user.email && <i className="fa-solid fa-check-circle text-green-500 shrink-0"></i>}
                    </div>
                  </div>

                  {/* User ID */}
                  {user._id && (
                    <div>
                      <label className="block text-xs uppercase font-bold  text-black tracking-widest mb-2">
                        User ID
                      </label>
                      <p className="text-xs font-mono text-gray-700 bg-slate-50 p-4 rounded-xl border border-slate-200 break-all">
                        {user._id}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Account Role */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-black tracking-widest mb-2">
                      Account Role
                    </label>
                    <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm ${
                      isAdmin
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-blue-100 text-blue-700 border border-blue-200"
                    }`}>
                      <i className={`fa-solid ${isAdmin ? "fa-crown" : "fa-user"}`}></i>
                      {isAdmin ? "Administrator" : "Regular User"}
                    </div>
                  </div>

                  {/* Account Status */}
                  <div>
                    <label className="block text-xs uppercase font-bold  text-black tracking-widest mb-2">
                      Account Status
                    </label>
                    <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm ${
                      isActive
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}>
                      <i className="fa-solid fa-circle text-xs"></i>
                      {isActive ? "Active" : "Inactive"}
                    </div>
                  </div>

                  {/* Member Since */}
                  {user.createdAt && (
                    <div>
                      <label className="block text-xs uppercase font-bold  text-black tracking-widest mb-2">
                        Member Since
                      </label>
                      <div className="bg-indigo-50 rounded-xl px-4 py-3 border border-indigo-100">
                        <p className="text-gray-900 font-semibold">
                          {formatDate(user.createdAt)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {formatTime(user.createdAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="my-8 border-t border-gray-200"></div>

              {/* Last Updated Info */}
              <div>
                <label className="block text-xs uppercase font-bold text-black tracking-widest mb-3">
                  Last Updated
                </label>
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                  {user.updatedAt ? (
                    <>
                      <p className="text-gray-900 font-semibold">
                        {formatDate(user.updatedAt)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatTime(user.updatedAt)}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-600">Not available</p>
                  )}
                </div>
              </div>

              {/* Security Info Footer */}
              <div className="mt-8 bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl px-5 py-4">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-shield text-green-600 text-lg mt-0.5 shrink-0"></i>
                  <div>
                    <p className="font-semibold text-green-900 text-sm">
                      Account Security
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      Your account is secure and all your information is protected with encryption.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
