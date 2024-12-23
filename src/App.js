import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppRouter from "./Routers";

/*************************************************************************************** */
const App = () => {
  return (
    <>
      <div className="App">
        <div className="container mw-100">
          <AppRouter />
        </div>
      </div>
    </>
  );
};
export default App;
