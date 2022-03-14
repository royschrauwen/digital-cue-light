import React from "react";
import { useState } from "react";

function CueBlock({ department }) {
  const [status, setStatus] = useState("");

  return (
    <div>
      <h3>CueBlock: {department}</h3>
      <h4>{status}</h4>
      <button
        onClick={() => {
          setStatus("Attentie");
        }}
      >
        Attentie
      </button>
      <button
        onClick={() => {
          setStatus("GO!");
        }}
      >
        Go
      </button>
    </div>
  );
}

export default CueBlock;
