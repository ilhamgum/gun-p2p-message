import React from "react";

export default function Chat({pub, alias}) {
  return (
    <div>
      <p>alias: {alias} </p>
      <p >pubkey: {pub} </p>
      <div style={{width: "50%"}}></div>
      <input placeholder="insert a messsage"/>
      <button>Send</button>
    </div>
  );
}
