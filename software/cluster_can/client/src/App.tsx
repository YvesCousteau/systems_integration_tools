import { useEffect, useState } from "react";
import * as io from "socket.io-client";
import logo  from "./Cluster_Basic.png";

const socket = io.connect('http://192.168.5.40:6001');

function App() {
  const [messages, setMessages] = useState(0)
  const [isConnected, setIsConnected] = useState(socket.connected);

  subscribeToTimer((timestamp:any) => setMessages(timestamp));
  
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);
  return (
    <div className="bg-black shadow-md min-h-screen grid grid-cols-1 content-center">
      <div className="mx-auto">
        <p className="w-32 text-6xl absolute inset-x-1/2 inset-y-1/2 top-96 -ml-14 text-white text-center">
          {messages}
        </p>
        <img src={logo} />
      </div>
    </div>
  );
}

function subscribeToTimer(cb: any) {
  socket.on('timer', cb);
  socket.emit('speed', 1);
}
export default App;