import React from "react";
import CueBlock from "./CueBlock";
import { useState } from "react";

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

  return (
    <div>
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
        <button onClick={sendMessage}>Send &#9658;</button>
      </div>

      <CueBlock department={department} />
      <CueBlock department="Troubleshooter" />
    </div>
  );
}

export default Chat;
