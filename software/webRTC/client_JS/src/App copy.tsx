import { useEffect, useState } from "react";
import * as io from "socket.io-client";
import logo  from "./Cluster_Basic.png";

const socket = io.connect('http://192.168.5.33:6001');

function App() {
  const [messages, setMessages] = useState(0)
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('speed::subscribe')
      setIsConnected(true);
    });

    socket.on('speed::update', (timestamp: any) => {
      console.log(timestamp)
      setMessages(timestamp)
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('speed::update');
    };
  }, []);
  return (
    <div className="bg-black shadow-md min-h-screen grid grid-cols-1 content-center">
      <img src={logo} className="relative"/>
      <div className="absolute inset-x-1/2 bottom-1/2 pb-10">
        <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white flex justify-center">
          {messages}
        </p>
      </div>
      <span className="flex h-3 w-3 absolute bottom-8 right-8">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? "bg-green-400" : "bg-red-400"}`}></span>
        <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? "bg-green-400" : "bg-red-400"}`}></span>
      </span>
    </div>
  );
}

export default App;