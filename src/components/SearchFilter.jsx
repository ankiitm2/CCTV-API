/* eslint-disable react/prop-types */
import { CiSearch } from "react-icons/ci";

const SearchFilter = ({ onSearch }) => (
  <div className="searchBtn">
    <input
      type="text"
      placeholder="search"
      onChange={(e) => onSearch(e.target.value)}
    />
    <CiSearch />
  </div>
);

export default SearchFilter;
