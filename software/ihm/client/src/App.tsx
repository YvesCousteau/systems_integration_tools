import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Devices from "./pages/Device";
import Function from "./pages/Function";
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
function App() {
  return (
      <div className="bg-gray-100 shadow-md min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Devices/>} />
              <Route path="functions" element={<Function />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    
  );
}

export default App;