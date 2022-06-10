import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { gun, user } from "../useGun";

export default function SignUp() {
  // states
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  async function register() {
    await user.create(username, password, async (ack) => {
      if (ack.ok === 0 && !ack.err) {
        let exist;
        const setData = `~${await user.is.pub}`;
        // if userlist is not exist
        if (gun.get("userlist") === undefined && !gun.get("userlist")) {
          gun.get("userlist").set(setData);
        }

        gun
          .get("userlist")
          .map()
          .once((ack) => (ack === setData ? (exist = true) : ""));

        // double check if user already exist
        if (exist === true) {
          console.log("dah ada");
        } else {
          gun.get("userlist").set(setData);
          console.log(ack);
          navigate("/login");
        }
      } else if (ack.err) {
        console.log(ack.err);
      }
    });
  }

  return (
    <div>
      <p>SignUp</p>
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
        onClick={register}
      >
        Register
      </button>
      <Link to="/login">Have an account</Link>
      <Link to="/">Home</Link>
    </div>
  );
}
