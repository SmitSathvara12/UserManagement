import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/userSlice";
import { deleteUserAPI } from "../api/userAPI";
import EditUserModal from "../components/EditUserModal";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import { handelError, handelSuccess } from "../utiles";
import Popup from "../components/Popup.jsx";
import { Link } from "react-router-dom";

const ManageUsers = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  const [deleting, setDeleting] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, roleFilter]);

  const handleDelete = async () => {
    try {
      setDeleting(selectedUserId);
      await deleteUserAPI(selectedUserId);
      handelSuccess("User deleted successfully");
      dispatch(fetchUsers());
    } catch (error) {
      handelError("Failed to delete user", error);
    } finally {
      setDeleting(null);
      setSelectedUserId(null);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const filteredUsers = users?.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "" || user.status === statusFilter;
    const matchRole = roleFilter === "" || user.role === roleFilter;
    return matchSearch && matchStatus && matchRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Navbar */}
        <Navbar />

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Manage Users
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              View, search, and manage all users in the system
            </p>
          </div>

          {/* Filters Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-6">
            {/* Filters - Single Row Layout */}
            <div className="flex flex-wrap items-end gap-4">
              {/* Search Input */}
              <div className="flex-1 min-w-64">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="fa-solid fa-search mr-2"></i>Search
                </label>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>

              {/* Status Filter */}
              <div className="w-full sm:w-40">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="fa-solid fa-info-circle mr-2"></i>Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 appearance-none bg-white"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Role Filter */}
              <div className="w-full sm:w-40">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="fa-solid fa-user-tie mr-2"></i>Role
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 appearance-none bg-white"
                >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("");
                  setRoleFilter("");
                  setCurrentPage(1);
                }}
                className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <i className="fa-solid fa-redo"></i>
                <span className="hidden sm:inline">Clear Filter</span>
              </button>

              {/* Create User Button */}
              {isAdmin && (
                <Link
                  to="/createUser"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold transition duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span className="hidden sm:inline">CreateUser</span>
                </Link>
              )}
            </div>
          </div>

          {/* User Table Section */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-8 sm:p-12 flex flex-col items-center justify-center">
                <div className="mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"></div>
                </div>
                <p className="text-gray-600 font-medium">Loading users...</p>
              </div>
            ) : currentUsers.length > 0 ? (
              <>
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <th className="px-4 sm:px-6 py-4 font-semibold text-gray-700">
                          <span className="flex items-center gap-2">
                            <i className="fa-solid fa-user text-blue-500"></i>
                            Name
                          </span>
                        </th>
                        <th className="px-4 sm:px-6 py-4 font-semibold text-gray-700 hidden sm:table-cell">
                          <span className="flex items-center gap-2">
                            <i className="fa-solid fa-envelope text-blue-500"></i>
                            Email
                          </span>
                        </th>
                        <th className="px-4 sm:px-6 py-4 font-semibold text-gray-700 hidden md:table-cell">
                          <span className="flex items-center gap-2">
                            <i className="fa-solid fa-shield text-blue-500"></i>
                            Role
                          </span>
                        </th>
                        <th className="px-4 sm:px-6 py-4 font-semibold text-gray-700 hidden lg:table-cell">
                          <span className="flex items-center gap-2">
                            <i className="fa-solid fa-circle text-green-500"></i>
                            Status
                          </span>
                        </th>
                        <th className="px-4 sm:px-6 py-4 font-semibold text-gray-700 text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {currentUsers.map((user) => (
                        <tr
                          key={user._id}
                          className="hover:bg-blue-50 transition duration-150"
                        >
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">
                                  {user.name}
                                </p>
                                <p className="text-gray-500 text-xs sm:hidden">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-gray-600 hidden sm:table-cell">
                            <p className="truncate">{user.email}</p>
                          </td>
                          <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                                user.role === "admin"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              <i
                                className={`fa-solid ${
                                  user.role === "admin" ? "fa-crown" : "fa-user"
                                }`}
                              ></i>
                              {user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                                user.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              <i
                                className={`fa-solid ${
                                  user.status === "active"
                                    ? "fa-circle-check"
                                    : "fa-circle-xmark"
                                }`}
                              ></i>
                              {user.status.charAt(0).toUpperCase() +
                                user.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEdit(user)}
                                className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition duration-200"
                                title="Edit user"
                              >
                                <i className="fa-solid fa-pen-to-square text-lg"></i>
                              </button>

                              <button
                                onClick={() => {
                                  setSelectedUserId(user._id);
                                  setShowDeletePopup(true);
                                }}
                                disabled={deleting === user._id}
                                className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Delete user"
                              >
                                {deleting === user._id ? (
                                  <i className="fa-solid fa-spinner animate-spin text-lg"></i>
                                ) : (
                                  <i className="fa-solid fa-trash-can text-lg"></i>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Results Info */}
                <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
                  <p>
                    Showing{" "}
                    <span className="font-semibold">{currentUsers.length}</span>{" "}
                    of{" "}
                    <span className="font-semibold">
                      {filteredUsers.length}
                    </span>{" "}
                    users
                  </p>
                </div>
              </>
            ) : (
              <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
                <div className="mb-4 p-4 bg-gray-100 rounded-full">
                  <i className="fa-solid fa-users text-4xl text-gray-400"></i>
                </div>
                <p className="text-gray-600 font-medium">No users found</p>
                <p className="text-gray-500 text-sm mt-1">
                  Try adjusting your filters or create a new user
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={usersPerPage}
              />
            </div>
          )}
        </div>

        {/* Edit Modal */}
        <EditUserModal
          isOpen={isEditModalOpen}
          user={editingUser}
          onClose={handleCloseModal}
        />

        {/* Delete Confirmation Popup */}
        <Popup
          isOpen={showDeletePopup}
          onClose={() => setShowDeletePopup(false)}
          onConfirm={handleDelete}
          title="Delete User"
          message="Are you sure you want to delete this user?"
          confirmText="Delete User"
          confirmColor="red"
        />
      </div>
    </div>
  );
};

export default ManageUsers;
