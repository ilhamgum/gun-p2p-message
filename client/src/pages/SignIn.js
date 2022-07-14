import React from "react";
import { user } from "../useGun";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  // states
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    async function isLogin() {
      if (await user.is) navigate("/");
    }
    isLogin();
  });

  async function login() {
    await user.auth(username, password, async (ack) => {
      if (!ack.err) {
        navigate("/", { replace: true });
        window.location.reload();
      } else {
        toast.error(ack.err, { id: "error" });
      }
    });
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-center -mt-24">
          <p className="text-4xl">sign in</p>
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
              onClick={login}
            >
              login
            </button>
          </div>
          <p className="mt-8">
            don't have an accout?
            <Link to="/register">
              <span className="text-blue-500 hover:text-blue-800">
                {" "}
                create account{" "}
              </span>
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
      <Toaster />
    </>
  );
}
