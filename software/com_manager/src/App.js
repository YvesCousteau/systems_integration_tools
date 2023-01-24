import React, { useState } from 'react';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import restProvider from 'ra-data-simple-rest';
const dataProvider = restProvider('http://localhost:3001');

function App() {
  const [index, setIndex] = useState(0);
  return (
    <div className="bg-gray-100 shadow-md min-h-screen" dataProvider={dataProvider}>
      <Navbar index={index} setIndex={setIndex}/>
      <Home index={index} />
    </div>
  );
}

export default App;