import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../features/userSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "../schemas/formSchemas";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormButton from "./FormButton";

const EditUserModal = ({ isOpen, user, onClose }) => {
  const dispatch = useDispatch();
  const { updating } = useSelector((state) => state.users);

  const roleOptions = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(editUserSchema) });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user, isOpen, reset]);

  const onSubmit = async (data) => {
    if (user?._id) {
      await dispatch(updateUserAsync({ id: user._id, data }));
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Name"
              type="text"
              placeholder="Enter Full Name"
              error={errors.name?.message}
              {...register("name")}
            />

            <FormInput
              label="Email"
              type="email"
              placeholder="Enter Email Address"
              error={errors.email?.message}
              {...register("email")}
            />

            <FormSelect
              label="Role"
              options={roleOptions}
              error={errors.role?.message}
              {...register("role")}
            />

            <FormSelect
              label="Status"
              options={statusOptions}
              error={errors.status?.message}
              {...register("status")}
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
