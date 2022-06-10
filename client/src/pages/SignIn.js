import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { user } from "../useGun";

export default function SignIn() {
  // states
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  async function login() {
    await user.auth(username, password, async (ack) => {
      // not error
      if (!ack.err) {
        console.log(await user.is.pub)
        navigate("/");
        window.location.reload();
      }
    });
  }

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
        onClick={login}
      >
        Login
      </button>
      <Link to="/register">Create account</Link>
      <Link to="/">Home</Link>
    </div>
  );
}
