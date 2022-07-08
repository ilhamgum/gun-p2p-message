import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { gun, user } from "../useGun";
import toast, { Toaster } from "react-hot-toast";

export default function SignUp() {
  // states
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();
  
  React.useEffect(() => {
    async function isLogin() {
      if (await user.is) {
        navigate("/", { replace: true });
      }
    }
    isLogin()
  });

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
          toast.error("user already exist in graph");
        } else {
          gun.get("userlist").set(setData);
          navigate("/login");
        }
      } else if (ack.err) {
        toast.error(ack.err);
      }
    });
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-center -mt-24">
          <p className="text-4xl">register</p>
          <div className="flex flex-col place-items-center mt-3 ">
            <input
              className="w-80 h-14 mt-3 rounded-full text-center"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="enter username"
            ></input>
            <input
              className="w-80 h-14 mt-3 rounded-full text-center"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="enter password"
            ></input>
            <button
              className="w-80 h-14 mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={register}
            >
              sign me up!
            </button>
            <Toaster />
          </div>
          <p className="mt-8">
            i have an account
            <Link to="/login">
              <span className="text-blue-500 hover:text-blue-800"> login</span>
            </Link>
          </p>
          <p>or</p>
          <p>
            <Link to="/">
              <span className="text-blue-500 hover:text-blue-800">go home</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
