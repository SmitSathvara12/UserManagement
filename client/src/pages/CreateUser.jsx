import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/authSlice";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import FormButton from "../components/FormButton";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const roleOptions = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await dispatch(createUser(formData));
      if (result) {
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "user",
        });
        navigate("/manageUser");
      }
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        <Navbar />

        <div className="flex justify-center items-center flex-1 p-4">
          <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Create User
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Name"
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Email"
                type="email"
                name="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Password"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <FormSelect
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={roleOptions}
              />

              <div className="flex gap-3 pt-2">
                <FormButton
                  type="submit"
                  label="Create User"
                  loading={loading}
                  variant="primary"
                  className="flex-1"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
