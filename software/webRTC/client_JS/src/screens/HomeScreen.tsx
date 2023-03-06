import { useState } from "react";
import { Link } from "react-router-dom";
import "./HomeScreen.css";

function HomeScreen() {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");

  return (
    <form method="post" action="">
      <label htmlFor="username">Username</label>

      <input
        value={username}
        title="username"
        onInput={(e:any) => setUsername(e.target.value)}
      />

      <label htmlFor="room">Room</label>

      <input
        value={room}
        title="room"
        onInput={(e:any) => setRoom(e.target.value)}
      />
      <Link to={`/call/${username}/${room}`}>
        <input type="submit" name="submit" value="Join Room" />
      </Link>
    </form>
  );
}

export default HomeScreen;