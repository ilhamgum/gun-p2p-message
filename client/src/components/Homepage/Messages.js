import React from "react";
import { GUN, SEA, gun, user } from "../../useGun";
import toast, { Toaster } from "react-hot-toast";
import Context from "../../contexts/context";
import { IconContext } from "react-icons/lib";
import {
  AiFillCloseCircle,
  AiOutlinePaperClip,
  AiOutlineSend,
} from "react-icons/ai";

export default function Messages() {
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const [newImageName, setNewImageName] = React.useState("");
  const [newImage, setNewImage] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState("");
  const [isShown, setIsShown] = React.useState(false);

  const { selected } = React.useContext(Context);

  const scrollToBottom = () => {
    const e = document.getElementById("scrollBottomAnchor");
    setTimeout(() => e.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const onImageClick = (e) => {
    setSelectedImage(e.target.currentSrc);
    setIsShown(true);
  };

  const fileRead = (file) => {
    let files = file.target.files[0];
    let fileExt = files.type.split("/");
    if (files.type.includes("image") && files.size < 2000000) {
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = (e) => {
        setNewImageName(`${files.name.slice(0, 10)}...${fileExt[1]}`);
        setNewImage(e.target.result);
      };
    } else {
      toast.error("only upload image thats not exceeding 2MB");
    }
  };

  // send message func
  const sendMessage = async () => {
    if (newMessage !== "" || newImage !== "") {
      const message = {
        what: await SEA.encrypt(newMessage, "foo"),
        img: await SEA.encrypt(newImage, "foo"),
        from: await user.is.pub,
        to: selected.pub,
      };
      const index = new Date().toISOString();
      gun.get("chat").get(index).put(message);
      setNewMessage("");
      setNewImage(null);
      setNewImageName("");
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
              what: await SEA.decrypt(data.what, "foo"),
              img: await SEA.decrypt(data.img, "foo"),
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
                    <div className="bg-[#476CF0] w-fit rounded-t-lg rounded-l-lg px-2 py-2">
                      {e.img ? (
                        <img
                          src={e.img}
                          alt=""
                          width="300"
                          height="300"
                          className="cursor-pointer"
                          onClick={onImageClick}
                        />
                      ) : null}
                      <p className="text-white">{e.what}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="flex space-x-2 my-2" key={e.pub}>
                    <div className="bg-[#476CF0] w-fit rounded-t-lg rounded-r-lg px-2 py-2">
                      {e.img ? (
                        <img
                          src={e.img}
                          alt=""
                          width="300"
                          height="300"
                          className="cursor-pointer"
                          onClick={onImageClick}
                        />
                      ) : null}
                      <p className="text-white">{e.what}</p>
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
          <div className="flex w-full h-full p-2 space-x-2 border-2 ">
            <div className="w-[95%] flex">
              <input
                className="w-[100%] rounded-l-full pl-4"
                type="text"
                placeholder="insert a messsage"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              {newImageName ? (
                <p className="flex items-center justify-center p-2 border-y border-black text-xs">
                  {newImageName}
                </p>
              ) : null}
              <label className="flex items-center justify-center w-[50px] hover:bg-blue-100 rounded-r-full cursor-pointer border-r border-t border-b border-black">
                <input
                  type="file"
                  onChange={(e) => fileRead(e)}
                  style={{ display: "none" }}
                />
                <IconContext.Provider
                  value={{
                    style: { fontSize: "30px", color: "rgb(0, 123, 255)" },
                  }}
                >
                  <AiOutlinePaperClip />
                </IconContext.Provider>
              </label>
            </div>
            <div className="w-[5%]">
              <button
                className="flex items-center justify-center w-full h-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="button"
                onClick={sendMessage}
              >
                <IconContext.Provider
                  value={{
                    style: { fontSize: "30px", color: "#fff" },
                  }}
                >
                  <AiOutlineSend />
                </IconContext.Provider>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-auto flex justify-center items-center">
          <p>add and click friends to start chatting</p>
        </div>
      )}
      <Toaster />
      {isShown ? (
        <div className="flex justify-center items-center fixed inset-0 z-50 bg-black/75">
          <div className="relative">
            <div className="rounded-lg shadow-lg max-w-4xl">
              <button
                className="absolute top-1 right-1 z-99 rounded-full opacity-50 hover:opacity-100"
                onClick={() => setIsShown(false)}
              >
                <IconContext.Provider
                  value={{
                    style: { fontSize: "40px", color: "#000" },
                  }}
                >
                  <AiFillCloseCircle />
                </IconContext.Provider>
              </button>
              <img src={selectedImage} alt="" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
