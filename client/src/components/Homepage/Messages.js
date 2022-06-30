import React from "react";
import { GUN, SEA, gun, user } from "../../useGun";
import toast, { Toaster } from "react-hot-toast";

import Context from "../../contexts/context";

export default function Messages() {
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const { selected } = React.useContext(Context);

  // send message func
  const sendMessage = async () => {
    if (newMessage !== "") {
      // const key = await SEA.secret(selected.epub, user._.sea); // key for e2ee
      const message = {
        what: await SEA.encrypt(newMessage, "foo"),
        from: await user.is.pub,
        to: selected.pub,
      };
      const index = new Date().toISOString();
      gun.get("chat").get(index).put(message);
      setNewMessage("");
      scrollToBottom();
    }
  };

  // get messages (credits: https://github.com/fireship-io/gun-chat with some changes)
  const getMessages = React.useCallback(async () => {
    setMessages([]);
    // iterate chat graph
    gun
      .get("chat")
      .map()
      .once(async (data) => {
        if (data) {
          const userPub = [user.is.pub, selected.pub];
          if (userPub.includes(data.from) && userPub.includes(data.to)) {
            // const key = await SEA.secret(selected.epub, user._.sea); // key for e2ee
            const message = {
              what: (await SEA.decrypt(data.what, "foo")) + "",
              when: GUN.state.is(data, "what"),
              from: data.from,
              to: data.to,
            };
            setMessages((old) => [...old, message]);
          }
        }
      });
  }, [selected]);

  React.useEffect(() => {
    getMessages();
  }, [getMessages]);

  const scrollToBottom = () => {
    const e = document.getElementById("scrollBottomAnchor");
    setTimeout(() => e.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const onEnter = (e) => {
    if (e.key === "Enter" && newMessage !== "") {
      sendMessage();
    }
  };

  return (
    <>
      {selected.pub ? (
        <div className="container grid grid-cols-1 grid-rows-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] w-full h-full overflow-hidden">
          {/* head profile */}
          <div className="flex justify-between items-center py-2 px-4 shadow-[0_1px_5px_0px_rgba(0,0,0,0.25)]">
            <div className="flex items-center space-x-4">
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-black"
                src={`https://avatars.dicebear.com/api/avataaars/${selected.alias}.svg`}
                alt=""
              />
              <p className="text-2xl uppercase">{selected.alias}</p>
            </div>
            <button
              className="flex items-center justify-center h-10 w-10 shadow-md shadow-yellow-500/50 hover:bg-slate-100 py-2 px-4 rounded-full"
              onClick={() => {
                navigator.clipboard.writeText(selected.pub);
                toast.success("key copied ✨", {
                  duration: 3000,
                  id: "clipboard",
                });
              }}
            >
              🔑
            </button>
          </div>
          {/* messages box */}
          <div className="row-[span_10] overflow-y-auto scrollbar p-4">
            {messages.map((e) => {
              scrollToBottom();
              if (e.from === user.is.pub) {
                return (
                  <div className="flex justify-end space-x-2 my-2" key={e.when}>
                    <p className="self-end text-xs opacity-50">
                      {new Date(e.when).toLocaleString().slice(0)}
                    </p>
                    <div className="bg-[#476CF0] w-fit rounded-t-lg rounded-l-lg px-2 py-1">
                      <p className="text-white select-all">{e.what}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="flex space-x-2 my-2" key={e.pub}>
                    <div className="bg-[#476CF0] w-fit rounded-t-lg rounded-r-lg px-2 py-1">
                      <p className="text-white select-all">{e.what}</p>
                    </div>
                    <p className="self-end text-xs opacity-50">
                      {new Date(e.when).toLocaleString().slice(0)}
                    </p>
                  </div>
                );
              }
            })}
            <div id="scrollBottomAnchor"></div>
          </div>
          {/* input box */}
          <div className="place-self-center w-full ">
            <input
              className="w-[90%] rounded-full pl-4 mx-2 "
              type="text"
              placeholder="insert a messsage"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                onEnter(e);
              }}
            />
            <button
              className="w-[8%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="h-full w-auto flex justify-center items-center">
          <p>add and click friends to start chatting</p>
        </div>
      )}
      <Toaster />
    </>
  );
}
