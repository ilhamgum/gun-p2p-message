import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>LandingPage</h1>
      <Link to={"/login"}>Getting started</Link>
    </div>
  );
}
