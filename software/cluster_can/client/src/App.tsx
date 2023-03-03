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
      <img src={logo}  className="relative"/>
      <div className="absolute right-1/2 left-1/2 bottom-1/2 -ml-9 sm:-ml-14 md:-ml-[75px] lg:-ml-[85px]">
        <p className="w-32 text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white pb-4 sm:pb-8 md:pb-8 lg:pb-8">
          {messages}
        </p>
      </div>
    </div>
  );
}

function subscribeToTimer(cb: any) {
  socket.on('timer', cb);
  socket.emit('speed', 1);
}
export default App;