import { memo } from 'react';

const Pagination = memo(({ currentPage, totalPages = 10, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 text-white rounded hover:text-yellow-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      <span className="text-gray-700 dark:text-gray-300 font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2  text-white rounded hover:text-yellow-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;

