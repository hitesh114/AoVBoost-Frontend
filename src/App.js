import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Formcontrol from "./component/formcontrol";
import Navbar from "./component/navbar";
import CreateNewOffer from "./component/offers";
import TableComponent from "./component/TableComponent";
import { fetchData } from "./component/API";
import Dashboard from "./Pages/Dashboard";
import Appdemo from "./Pages/App-Demo";
import Contactus from "./Pages/Contact-Us";
/* *************************************************************************** */
const App = () => {
  const [data, setData] = useState([]);
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [editingOffer, setEditingOffer] = useState(null);
  /* *************************************************************************** */
  /* Fetch data from API using useEffect */
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setData(data);
      setOffers(data);
      handleDataChange(data);
    };
    loadData();
  }, []);
  /* *************************************************************************** */
  /* Handle offer add and edit */
  const handleDataChange = (newData) => {
    setData(newData);
    setOffers(newData);
    setFilterValue("All");
  };
  /* *************************************************************************** */
  /* Handle Search */
  const handleSearchChange = (event) => {
    console.log("Search recived");
    setSearchTerm(event.target.value);
  };
  /* *************************************************************************** */
  /* Handle Filter  */
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };
  /* *************************************************************************** */
  /* Filter data */
  const filteredData = offers.filter((offer) => {
    return offer.offer.toLowerCase().includes(searchTerm.toLowerCase());
  });
  /* *************************************************************************** */
  return (
    <>
      <div className="App">
        <div className="container">
          <Router>
            <Navbar />

            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/AppDemo" element={<Appdemo />} />
              <Route path="/ContactUs" element={<Contactus />} />
              <Route
                path="/offers"
                element={
                  <>
                    {/* Form Control */}
                    <Formcontrol
                      searchTerm={searchTerm}
                      handleSearchChange={handleSearchChange}
                      filterValue={filterValue}
                      handleFilterChange={handleFilterChange}
                      data={filteredData}
                    />
                    {/* Table Component */}
                    <TableComponent
                      data={filteredData}
                      setData={handleDataChange}
                    />
                  </>
                }
              />
              {/* Create offer */}
              <Route
                path="/create-offer"
                element={
                  <CreateNewOffer data={data} setData={handleDataChange} />
                }
              />
              {/* Edit Offer */}
              <Route
                path="/edit-offer/:id"
                element={
                  <CreateNewOffer data={data} setData={handleDataChange} />
                }
              />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
};

export default App;
