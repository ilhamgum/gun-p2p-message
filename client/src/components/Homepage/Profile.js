import React from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../../useGun";
import toast, { Toaster } from "react-hot-toast";

import Context from "../../contexts/context";

import Information from "./Information";

export default function Profile() {
  const [isShown, setIsShown] = React.useState(false);
  const { alias, pub, setPub, setAlias } = React.useContext(Context);

  const navigate = useNavigate();

  // getting user alias and pub
  React.useEffect(() => {
    async function getInfo() {
      setPub(await user.get("pub"));
      setAlias(await user.get("alias"));
    }
    getInfo();
  }, [setPub, setAlias]);

  async function logout() {
    await user.leave();
    if (!user._.sea) {
      console.log("log out", user._.sea);
      navigate("/");
      window.location.reload();
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2 mx-2 ">
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src={`https://avatars.dicebear.com/api/avataaars/${alias}.svg`}
            alt=""
          />
          <p className="text-4xl uppercase">{alias}</p>
        </div>
        <div className="flex">
          <button
            className="shadow-md shadow-yellow-500/50  hover:bg-slate-100 py-2 px-4 rounded-full mr-4"
            onClick={() => setIsShown(true)}
          >
            ℹ
          </button>
          <button
            className="shadow-md shadow-yellow-500/50  hover:bg-slate-100 py-2 px-4 rounded-full mr-8"
            onClick={() => {
              navigator.clipboard.writeText(pub);
              toast.success("key copied, share it to your friends ✨", {
                duration: 3000,
                id: "clipboard",
              });
            }}
          >
            🔑
          </button>
          <Toaster />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
      {/* info modal */}
      {isShown ? (
        <>
          <div className="justify-center items-center -mt-64 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold mr-4">
                    Apps Information
                  </h3>
                  <button
                    className="p-1 bg-transparent text-black opacity-5 float-right text-xl"
                    onClick={() => setIsShown(false)}
                  >
                    ❌
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <Information />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
