import "./App.css";
import GUN from "gun/gun";
import SEA from "gun/sea";
import React from "react";
import { useState } from "react";

export default function App() {
  // initialize gun
  const gun = GUN({
    peers: ["http://localhost:3030/gun"],
  });
  // create object references
  const user = gun.user();

  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");

  // hooks
  function createUser() {
    user.create(username, password, (ack) => {
      console.log(ack);
    });
  }

  function authUser() {
    user.auth(username, password, (ack) => {
      console.log("logged in, public key:", ack.get);
    });
  }

  async function authPair() {
    const pair = await SEA.pair((ack) =>
      console.log("pair cb |", JSON.stringify(ack))
    );
    user.auth(pair, (ack) => {
      setKey(JSON.stringify(pair));
      console.log("success", ack);
    });
  }

  function authKeyPair() {
    user.auth(key, (ack) => console.log("success", ack));
  }

  function logout() {
    user.leave();
    if (user._.sea) {
      console.log("not logout", user._.sea);
    } else {
      console.log("logged out", user._.sea);
    }
  }

  function check() {
    gun.on("auth", (ack) => console.log(ack));
    if (user.is) {
      console.log("loggedin, key= ", JSON.stringify(user.is));
    } else {
      console.log("not logged in", user.is);
    }
  }

  return (
    <div className="App">
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
      <input
        type="text"
        onChange={(e) => setKey(e.target.value)}
        value={key}
        placeholder="Enter key"
      ></input>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={authUser}
      >
        Login
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={authKeyPair}
      >
        Login Key
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={authPair}
      >
        Login Pair
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={createUser}
      >
        Register
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={check}
      >
        Check
      </button>
      <p>Key:{key}</p>
    </div>
  );
}
