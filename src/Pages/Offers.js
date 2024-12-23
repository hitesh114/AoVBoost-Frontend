import React, { useEffect, useState } from "react";
import SearchAndFilter from "../Components/SearchAndFilter.js";
import TableComponent from "../Components/TableComponents.js";
import { fetchOffer, GetItems } from "../Apis/APIOffer.js";
import Loader from "../Components/Loader.js";

const Offers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce
  useEffect(() => {
    const applyFilters = () => {
      setIsLoading(true);
      const newFilteredData = data
        .filter((offer) =>
          offer.offer.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((offer) => {
          if (filterValue === "Enabled") return offer.enabled;
          if (filterValue === "Disabled") return !offer.enabled;
          return true; // For "All"
        });
      setFilteredData(newFilteredData);
      setTimeout(() => {
        setIsLoading(false); // Set loading to false after a delay
      }, 1000);
    };
    applyFilters();
  }, [data, debouncedSearchTerm, filterValue]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchOffer();
        console.log("Fetched Data in Offers:", fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false); // Set loading to false after a delay
        }, 1000); // Adjust the delay time (in milliseconds) as needed
      }
    };
    loadData();
  }, []);

  const handleDataChange = (newData) => {
    setData(newData);
    setFilterValue("All");
  };
  return (
    <div className="box_sty1">
      {isLoading && <Loader size="50" strokeColor="skyblue" strokeWidth="4" />}
      <SearchAndFilter
        searchTerm={searchTerm}
        handleSearchChange={(e) => setSearchTerm(e.target.value)}
        filterValue={filterValue}
        handleFilterChange={(e) => setFilterValue(e.target.value)}
        data={filteredData}
      />
      <TableComponent data={filteredData} setData={handleDataChange} />
    </div>
  );
};

export default Offers;
