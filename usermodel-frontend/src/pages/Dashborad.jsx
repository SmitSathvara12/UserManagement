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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col md:ml-64">
        <div className="md:hidden p-4">
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-700 text-2xl"
          >
            ☰
          </button>
        </div>

        <Navbar />

        <div className="p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-gray-500 mb-2">Total Users</h2>
              <p className="text-3xl font-semibold">{totalUsers}</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-gray-500 mb-2">Admins</h2>
              <p className="text-3xl font-semibold">{totalAdmins}</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-gray-500 mb-2">Users</h2>
              <p className="text-3xl font-semibold">{totalNormalUsers}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
