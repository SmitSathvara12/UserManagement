import React from "react";

const FormContainer = ({ title, children, className = "", onSubmit }) => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md border border-gray-100">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {title}
        </h2>
      )}
      <form className={className} onSubmit={onSubmit}>{children}</form>
    </div>
  );
};

export default FormContainer;
