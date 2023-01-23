import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-gray-100 shadow-md min-h-screen">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;