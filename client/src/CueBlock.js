import React from "react";
import { useState } from "react";

function CueBlock({ socket, department }) {
  const [status, setStatus] = useState("");

  const changeStatus = (cueValue) => {
    const statusData = {
      dept: department,
      stat: cueValue,
    };
    socket.emit("change_status", statusData);
  };

  return (
    <div>
      <h3>CueBlock: {department}</h3>
      <h4>{status}</h4>
      <button
        onClick={() => {
          setStatus("Attentie");
          changeStatus("Attentie");
        }}
      >
        Attentie
      </button>
      <button
        onClick={() => {
          setStatus("GO!");
          changeStatus("GO!");
        }}
      >
        Go
      </button>
    </div>
  );
}

export default CueBlock;
