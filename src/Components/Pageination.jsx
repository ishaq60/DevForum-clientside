

const Pageination = ({  numberOfPages, setCurrentPage, currentPage,pages }) => {
  console.log( numberOfPages)
  return (
    <div className="mt-8 flex justify-center">
      <nav className="flex items-center space-x-2">

        {/* Previous button */}
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {/* Page buttons */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`px-3 py-2 text-sm font-medium rounded ${
              currentPage === page + 1
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-700 bg-transparent'
            }`}
          >
            {page + 1}
          </button>
        ))}

        {/* Next button */}
        <button
          disabled={currentPage >= pages.length}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>

      </nav>
    </div>
  );
};

export default Pageination;
