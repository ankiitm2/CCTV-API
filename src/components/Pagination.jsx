/* eslint-disable react/prop-types */
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  // Ensure totalItems and itemsPerPage have valid values
  const validTotalItems = totalItems || 0;
  const validItemsPerPage = itemsPerPage || 10;

  // Calculate the range of items for the current page
  const startItem = (currentPage - 1) * validItemsPerPage + 1;
  const endItem = Math.min(currentPage * validItemsPerPage, validTotalItems);

  return (
    <div className="pagination">
      {/* Page Number Dropdown */}
      <select
        value={currentPage}
        onChange={(e) => onPageChange(Number(e.target.value))}
      >
        {[...Array(totalPages)].map((_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>

      {/* Page Range Display */}
      <div className="page-range">
        {validTotalItems > 0
          ? `${startItem}-${endItem} of ${validTotalItems}`
          : "No items available"}
      </div>

      <div className="btn_grp">
        {/* Double Arrow to First Page */}
        <button
          className="doubleArrow"
          onClick={() => onPageChange(1)} // Go to the first page
        >
          <MdKeyboardDoubleArrowLeft />
        </button>

        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack />
        </button>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <IoIosArrowForward />
        </button>

        {/* Double Arrow to Last Page */}
        <button
          className="doubleArrow"
          onClick={() => onPageChange(totalPages)} // Go to the last page
        >
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
