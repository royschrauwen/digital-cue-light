import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h1>Digital Cue Light</h1>
          <input
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            type="text"
            placeholder="Name..."
          />
          <input
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            type="text"
            placeholder="Room ID..."
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
