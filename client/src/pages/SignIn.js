import React from "react";
import { Link } from "react-router-dom";
import { authUser } from "../hooks";

export default function SignIn() {
  // states
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div>
      <p>SignIn</p>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="Enter username"
      ></input>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter password"
      ></input>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => authUser(username, password)}
      >
        Login
      </button>
      <Link to="/register">Create account</Link>
      <Link to="/">Home</Link>
    </div>
  );
}
