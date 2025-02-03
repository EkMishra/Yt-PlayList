import { useState } from "react";
import "./App.css";
import FrontPage from "./pages/FrontPage";
import SummaryPage from "./pages/SummaryPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<FrontPage />}/>
        <Route path="/summary" element={<SummaryPage/>}/>
      </Routes>
    </>
  );
}

export default App;
