import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*
          Erreur 404:
         <Route path="*" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
