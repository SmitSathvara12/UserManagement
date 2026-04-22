import { useDispatch } from "react-redux";
import { createUser } from "../features/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../schemas/formSchemas";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import FormButton from "../components/FormButton";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const roleOptions = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: { name: "", email: "", password: "", role: "user" },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await dispatch(createUser(data));
      if (result) {
        reset();
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

              <FormInput
                label="Password"
                type="password"
                placeholder="Enter Password"
                error={errors.password?.message}
                {...register("password")}
              />

              <FormSelect
                label="Role"
                options={roleOptions}
                error={errors.role?.message}
                {...register("role")}
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
