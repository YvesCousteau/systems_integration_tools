import { HashRouter as Router } from "react-router-dom";
import RouteList from "./screens/RouteList";

function App() {
  const startConnection = () => {
    const constraints = {
      'video': true,
      'audio': true
    }
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      console.log("Local Stream found");
    })
    .catch((error) => {
      console.error("Stream not found: ", error);
    });
  }

  return (
    <Router>
      <RouteList />
    </Router>
  );
}

export default App;
