import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../features/userSlice";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormButton from "./FormButton";

const EditUserModal = ({ isOpen, user, onClose }) => {
  const dispatch = useDispatch();
  const { updating } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
  });

  const roleOptions = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?._id) {
      await dispatch(
        updateUserAsync({
          id: user._id,
          data: formData,
        })
      );

      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Edit User
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

            <FormSelect
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions}
            />

            <FormSelect
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
            />

            <div className="flex justify-end gap-3 pt-4">
              <FormButton
                type="button"
                label="Cancel"
                onClick={onClose}
                variant="secondary"
              />

              <FormButton
                type="submit"
                label="Update User"
                loading={updating}
                variant="primary"
                disabled={updating}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
