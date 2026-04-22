import React from "react";

const FormButton = ({
  type = "submit",
  label,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "px-6 py-2.5 rounded-lg font-semibold transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-400 text-white hover:bg-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};

export default FormButton;
