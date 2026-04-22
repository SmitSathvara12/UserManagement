import { useDispatch } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/formSchemas";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import FormContainer from "../components/FormContainer";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await dispatch(loginUser(data));
      if (result.payload) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <FormContainer title="Login" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="pt-2">
          <FormButton
            type="submit"
            label="Login"
            loading={loading}
            variant="primary"
            className="w-full"
          />
        </div>
      </FormContainer>
    </div>
  );
};

export default Login;
