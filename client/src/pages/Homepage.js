import React from "react";
import { check, logout } from "../hooks";

export default function Homepage() {
  return (
    <div>
      <p>Homepage</p>
      <button onClick={() => logout()}>logout</button>
      <button onClick={() => check()}>check</button>
    </div>
  );
}
