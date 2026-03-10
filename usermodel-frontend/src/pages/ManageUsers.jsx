import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/userSlice";
import { toast } from "react-toastify";
import { deleteUserAPI } from "../api/userAPI";
import EditUserModal from "../components/EditUserModal";
import Sidebar from "../components/Sidebar";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  const [deleting, setDeleting] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, roleFilter]);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      setDeleting(userId);
      await deleteUserAPI(userId);
      toast.success("User deleted successfully");
      dispatch(fetchUsers());
    } catch (error) {
      toast.error("Failed to delete user",error);
    } finally {
      setDeleting(null);
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

  // filter users
  const filteredUsers = users?.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "" || user.status === statusFilter;

    const matchRole = roleFilter === "" || user.role === roleFilter;

    return matchSearch && matchStatus && matchRole;
  });

  // pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="flex min-h-screen ">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6">Manage Users</h1>

        {/* Filters  */}
        <div className="p-4 rounded shadow mb-5 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by name or email"
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
        </div>

        {/* Table */}
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

                    <td className="p-3">
                      <span className="px-2 py-1 font-bold rounded text-m">
                        {user.role}
                      </span>
                    </td>

                    <td className="p-3">
                      <span className={`px-2 py-1 font-bold rounded text-m`}>
                        {user.status}
                      </span>
                    </td>

                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(user._id)}
                        disabled={deleting === user._id}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
                      >
                        {deleting === user._id ? "Deleting..." : "Delete"}
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
              className="px-3 py-1 cursor-pointer bg-gray-300 font-black rounded "
            >
              Prev
            </button>

          <p className="text-sm text-black-600">
            Page {currentPage} of {totalPages || 1}
          </p>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 font-black rounded bg-gray-300 "
            >
              Next
            </button>
          </div>
        </div>

        <EditUserModal
          isOpen={isEditModalOpen}
          user={editingUser}
          onClose={handleCloseModal}
        />
      
    </div>
  );
};

export default ManageUsers;
