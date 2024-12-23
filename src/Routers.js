import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Offers from "./Pages/Offers.js";
import Dashboard from "./Pages/Dashboard";
import AddOrEditOffer from "./Pages/AddOrEditOffer";
/* ******************************************************************************* */
const AppRouter = () => {
  /* const [data, setData] = useState([]); */
  /* ***************************************************************************** */
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/offers" element={<Offers />} />
        <Route
          path="/create-offer"
          element={
            <AddOrEditOffer /* data={data} */ /* setData={handleDataChange} */
            />
          }
        />
        <Route
          path="/edit-offer/:id"
          element={
            <AddOrEditOffer /* data={data} */ /* setData={handleDataChange} */
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
