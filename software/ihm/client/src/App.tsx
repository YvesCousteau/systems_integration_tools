import { useState } from 'react';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
function App() {
  const [index, setIndex] = useState(0);
  return (
      <div className="bg-gray-100 shadow-md min-h-screen">
        <Navbar index={index} setIndex={setIndex} />
        <Home index={index} />
      </div>
    
  );
}

export default App;