import React, { useState } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  // itemsPerPage = 5,
}) => {
  const [inputPage, setInputPage] = useState("");

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      setInputPage("");
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      setInputPage("");
    }
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(inputPage, 10);

    if (
      isNaN(pageNum) ||
      pageNum < 1 ||
      pageNum > totalPages ||
      pageNum === currentPage
    ) {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
      setInputPage("");
      return;
    }

    onPageChange(pageNum);
    setInputPage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 mt-8 p-4 bg-white rounded-lg shadow">
      {/* Main Pagination Controls */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-600"
        >
          <i className="fa-solid fa-chevron-left mr-2"></i>
          Previous
        </button>

        {/* Page Info */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700">
            Page <span className="text-lg text-blue-600">{currentPage}</span> of{" "}
            <span className="text-lg text-blue-600">{totalPages}</span>
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-600"
        >
          Next
          <i className="fa-solid fa-chevron-right ml-2"></i>
        </button>
      </div>

      {/* Input-based Page Navigation */}
      <div className="flex items-center gap-3">
        <label htmlFor="goToPage" className="text-sm font-semibold text-gray-700">
          Jump to page:
        </label>
        <div className="flex gap-2">
          <input
            id="goToPage"
            type="number"
            min="1"
            max={totalPages}
            placeholder="Enter page number"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 w-40"
          />
          <button
            onClick={handleGoToPage}
            disabled={!inputPage.trim()}
            className="px-6 py-2.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-600"
          >
            Go
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="text-center text-xs text-gray-600 pt-2 border-t border-gray-200">
        <p>
          Showing <span className="font-semibold">5 items per page</span>
        </p>
      </div>
    </div>
  );
};

export default Pagination;