import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/userSlice";
import { deleteUserAPI } from "../api/userAPI";
import EditUserModal from "../components/EditUserModal";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { handelError, handelSuccess } from "../utiles";
import Popup from "../components/popup.jsx";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

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
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        <div className="flex-1 p-8">
          <h1 className="text-3xl font-semibold mb-6">Manage Users</h1>

          {/* Filters */}
          <div className="p-4 rounded shadow mb-5 flex flex-wrap gap-3 items-center">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded w-64"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("");
                setRoleFilter("");
                setCurrentPage(1);
              }}
              className="bg-red-500 text-white px-2 py-2 rounded font-semibold transition"
            >
              <i className="fa-solid fa-xmark rounded"></i>
            </button>
          </div>

          {/* User Table */}
          {loading ? (
            <p>Loading users...</p>
          ) : currentUsers.length > 0 ? (
            <div className="bg-white rounded shadow overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user._id} className="border-t">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.role}</td>
                      <td className="p-3">{user.status}</td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-500 px-3 py-1 rounded text-lg cursor-pointer"
                        >
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedUserId(user._id);
                            setShowDeletePopup(true);
                          }}
                          disabled={deleting === user._id}
                          className="text-red-800 px-3 py-1 rounded text-lg cursor-pointer"
                        >
                          {deleting === user._id ? (
                            "Deleting..."
                          ) : (
                            <i className="fa-regular fa-trash-can"></i>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No users found</p>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 cursor-pointer bg-gray-300 font-black rounded"
            >
              Prev
            </button>

            <p className="text-sm text-black-600">
              Page {currentPage} of {totalPages || 1}
            </p>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 font-black rounded bg-gray-300"
            >
              Next
            </button>
          </div>
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
