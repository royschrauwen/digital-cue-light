import React from "react";
import CueBlock from "./CueBlock";
import { useState, useEffect } from "react";

function Chat({ socket, username, room }) {
  const department = "Stagemanager";

  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      };

      await socket.emit("send_message", messageData);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>

      <CueBlock socket={socket} department={department} />
      <CueBlock socket={socket} department="Troubleshooter" />
    </div>
  );
}

export default Chat;
