import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/userSlice";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const totalUsers = users?.length || 0;
  const totalAdmins = users?.filter((u) => u.role === "admin").length || 0;
  const totalNormalUsers = users?.filter((u) => u.role === "user").length || 0;
  const activeUsers = users?.filter((u) => u.status === "active").length || 0;

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col md:ml-64">
        <div className="md:hidden p-4">
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-700 text-2xl hover:text-gray-900 transition"
          >
            ☰
          </button>
        </div>

        <Navbar />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">Welcome back! Here's your system overview</p>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {/* Total Users Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition duration-200">
              {/* Card Header */}
              <div className="bg-linear-to-r from-blue-500 to-blue-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Users</p>
                    <p className="text-white text-3xl font-bold mt-1">{totalUsers}</p>
                  </div>
                
                </div>
              </div>
              {/* Card Footer */}
              <div className="px-6 py-3 bg-blue-50 border-t border-blue-100">
                <p className="text-xs text-blue-700 font-semibold">
                  <i className="fa-solid fa-arrow-trend-up mr-1.5"></i>
                  All registered users
                </p>
              </div>
            </div>

            {/* Active Users Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition duration-200">
              {/* Card Header */}
              <div className="bg-linear-to-r from-green-500 to-green-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Active Users</p>
                    <p className="text-white text-3xl font-bold mt-1">{activeUsers}</p>
                  </div>
                
                </div>
              </div>
              {/* Card Footer */}
              <div className="px-6 py-3 bg-green-50 border-t border-green-100">
                <p className="text-xs text-green-700 font-semibold">
                  <i className="fa-solid fa-circle text-xs mr-1.5"></i>
                  Currently active
                </p>
              </div>
            </div>

            {/* Administrators Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition duration-200">
              {/* Card Header */}
              <div className="bg-linear-to-r from-purple-500 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Administrators</p>
                    <p className="text-white text-3xl font-bold mt-1">{totalAdmins}</p>
                  </div>
               
                </div>
              </div>
              {/* Card Footer */}
              <div className="px-6 py-3 bg-purple-50 border-t border-purple-100">
                <p className="text-xs text-purple-700 font-semibold">
                  <i className="fa-solid fa-shield mr-1.5"></i>
                  Admin accounts
                </p>
              </div>
            </div>

            {/* Regular Users Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition duration-200">
              {/* Card Header */}
              <div className="bg-linear-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100 text-sm font-medium">Regular Users</p>
                    <p className="text-white text-3xl font-bold mt-1">{totalNormalUsers}</p>
                  </div>
               
                </div>
              </div>
              {/* Card Footer */}
              <div className="px-6 py-3 bg-indigo-50 border-t border-indigo-100">
                <p className="text-xs text-indigo-700 font-semibold">
                  <i className="fa-solid fa-user-tag mr-1.5"></i>
                  Standard users
                </p>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Health Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <i className="fa-solid fa-heart-pulse text-indigo-600 text-lg"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">System Health</h3>
              </div>

              <div className="space-y-4">
                {/* Health Indicator */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-700">Overall Status</p>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                      <i className="fa-solid fa-circle text-xs"></i>
                      Healthy
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">Quick Stats</p>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-600">Active Rate</p>
                    <p className="font-bold text-gray-900">{totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Distribution Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <i className="fa-solid fa-chart-pie text-purple-600 text-lg"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">User Distribution</h3>
              </div>

              <div className="space-y-4">
                {/* Admin Distribution */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-purple-500"></span>
                      <p className="text-sm font-semibold text-gray-700">Administrators</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{totalAdmins}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: totalUsers > 0 ? `${(totalAdmins / totalUsers) * 100}%` : "0%" }}></div>
                  </div>
                </div>

                {/* Regular Users Distribution */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-indigo-500"></span>
                      <p className="text-sm font-semibold text-gray-700">Regular Users</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{totalNormalUsers}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: totalUsers > 0 ? `${(totalNormalUsers / totalUsers) * 100}%` : "0%" }}></div>
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

export default Dashboard;
