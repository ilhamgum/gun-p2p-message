import React from "react";
// compos
import Friends from "../components/Homepage/Friends";
import Profile from "../components/Homepage/Profile";
import AddFriend from "../components/Homepage/AddFriend";
import Messages from "../components/Homepage/Messages";

export default function Homepage() {
  const [isShown, setIsShown] = React.useState(false);
  return (
    <>
      <div className="w-screen h-screen">
        <div className="p-4">
          <Profile />
        </div>
        <div className="grid overflow-auto grid-cols-4 grid-rows-8 rounded-t-3xl shadow-[0_-1px_5px_0px_rgba(0,0,0,0.25)] h-[92.5%]">
          <div className="bg-[#F3FAFE] box row-span-2 rounded-tl-3xl ">
            <div className="flex justify-between items-center p-4 ">
              <p className="text-lg underline underline-offset-4">CONTACTS</p>
              <button
                className="text-md bg-blue-100/50 hover:bg-blue-100 p-[3px] rounded-full"
                onClick={() => setIsShown(true)}
              >
                ➕
              </button>
            </div>
            <div>
              <Friends />
            </div>
          </div>
          <div className="box row-span-2 col-span-3 ">
            <Messages />
          </div>
        </div>
      </div>
      {isShown ? (
        <>
          <div className="justify-center items-center -mt-64 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold mr-4">
                    add friend by public key
                  </h3>
                  <button
                    className="p-1 bg-transparent text-black opacity-5 float-right text-xl"
                    onClick={() => setIsShown(false)}
                  >
                    ❌
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <AddFriend />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black "></div>
        </>
      ) : null}
    </>
  );
}
