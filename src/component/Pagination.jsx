

// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
 console.log(totalPages)
  return (
    <div className="d-flex justify-content-center align-items-center my-4">
    <button
      className="btn btn-outline-primary me-3"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span className="mx-2">Page {currentPage} of {totalPages}</span>
    <button
      className="btn btn-outline-primary ms-3"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
  );
};

export default Pagination;
