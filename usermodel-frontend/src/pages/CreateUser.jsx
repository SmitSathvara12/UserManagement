import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/authSlice";
import Sidebar from "../components/Sidebar";

const CreateUser = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(createUser(formData));
      if (result) {
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "user",
        });
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div className="flex">

    <Sidebar />

    <div className="flex-1 flex justify-center w-full items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create User</h2>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Create User
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateUser;
