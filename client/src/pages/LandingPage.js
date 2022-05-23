import React from "react";
import { Link } from "react-router-dom";
import { check } from "../hooks";

export default function LandingPage() {
  return (
    <div>
      <h1>LandingPage</h1>
      <Link to={"/try"}>Try</Link>
      <Link to={"/login"}>Login</Link>
      <button onClick={() => check()}>check</button>
    </div>
  );
}
