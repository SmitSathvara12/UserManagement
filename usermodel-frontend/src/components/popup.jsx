import React from "react";

const Popup = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  confirmColor = "red",
}) => {
  if (!isOpen) return null;

  const buttonColor =
    confirmColor === "blue"
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-red-500 hover:bg-red-600";

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 text-lg cursor-pointer"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div className="flex justify-center mb-5">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-red-100">
            <i class="fa-solid fa-triangle-exclamation text-5xl text-red-500"></i>
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold text-center mb-2">
          {title}
        </h2>

        <p className="text-gray-500 text-sm sm:text-base text-center mb-6 px-2">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleConfirm}
            className={`flex-1 text-white py-2.5 cursor-pointer rounded-lg font-medium transition ${buttonColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
