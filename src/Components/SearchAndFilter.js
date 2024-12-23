import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/* ********************************************************************************************************************** */
/* Search and filter */
const SearchAndFilter = ({
  searchTerm,
  handleSearchChange,
  filterValue,
  handleFilterChange,
  data,
}) => {
  const navigate = useNavigate();
  const [filterData, setfilterData] = useState([]);
  useEffect(() => {
    let filteredData = data;
    
    if (filterValue !== "All") {
      filteredData = filteredData.filter(
        (offer) => offer.category === filterValue
      );
    }
    
    if (filterValue === "Enabled") {
      filteredData = filteredData.filter((offer) => offer.enabled);
    } else if (filterValue === "Disabled") {
      filteredData = filteredData.filter((offer) => !offer.enabled);
    }

    setfilterData(filteredData);
  }, [filterValue, data]);

  /* **************************************************************************************************************** */
  return (
    <div className="box_sty1">
      <div className="d-flex justify-content-between mb-3 col-gap-15">
        {/* Search Table */}
        <input
          className="form-control w-50"
          type="text"
          placeholder="Search offers..."
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search"
        />

        {/* Fliter Table */}
        <select
          className="dropdown-toggle w-25"
          value={filterValue}
          onChange={handleFilterChange}
          aria-expanded="false"
        >
          <option value="All">All</option>
          <option value="Enabled">Enabled</option>
          <option value="Disabled">Disabled</option>
        </select>
        <div className="flex-grow-1"></div>

        {/* Create New Offer */}
        <button
          className="btn btn-sty1"
          onClick={() => navigate("/create-offer")}
        >
          Create New Offers
        </button>
      </div>
    </div>
  );
};
export default SearchAndFilter;
