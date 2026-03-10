
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/userSlice";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const totalUsers = users?.length || 0;
  const totalAdmins = users?.filter((u) => u.role === "admin").length || 0;
  const totalNormalUsers = users?.filter((u) => u.role === "user").length || 0;

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-gray-500 text-lg mb-2">Total Users</h2>
              <p className="text-3xl font-semibold">{totalUsers}</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-gray-500 text-lg mb-2">Admins</h2>
              <p className="text-3xl font-semibold text-black">
                {totalAdmins}
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-gray-500 text-lg mb-2">Users</h2>
              <p className="text-3xl font-semibold text-black">
                {totalNormalUsers}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
