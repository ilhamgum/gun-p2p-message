import React from "react";
import { gun, user } from "../../useGun";
import toast, { Toaster } from "react-hot-toast";

export default function Stranger() {
  const [stranger, setStranger] = React.useState([]);

  const addFriend = React.useCallback(async (input) => {
    let pub = `~${input}`;
    let existInUserList; // state given if user existInUserList
    let existInFriendList;

    // iterate through all list
    gun
      .get("userlist")
      .map()
      .once((ack) => (ack === pub ? (existInUserList = true) : ""));

    user
      .get("friends")
      .map()
      .once((ack) => (ack === pub ? (existInFriendList = true) : ""));

    // check if user exist in user list
    if (existInUserList === true) {
      // user input their pub key itself
      if (pub === `~${user.is.pub}`) {
        toast.error("can't add yourself to the list");
      }
      // input already in friend list
      else if (existInFriendList === true) {
        toast.error("already in your friend list");
      }
      // user exist in userlist and can be add to friend list
      else {
        user.get("friends").set(pub, (ack) => console.log(ack));
        toast.success(
          "added as friend, let's holla at them! 💫, page will reload",
          {
            duration: 3000,
          }
        );
        setTimeout(() => window.location.reload(), 1000);
      }
    }
    // input not match with any pub in userlist
    else {
      toast.error("user not exist");
    }
  }, []);

  React.useEffect(() => {
    // get incoming message that's not from friends
    const getIncomingMessages = async () => {
      const temp = [];
      const friends = [];
      // run if friends node not exist
      !(await user.get("friends"))
        ? gun
            .get("chat")
            .map()
            .once(async (data) => {
              if (data.to === (await user.is.pub)) {
                if (!temp.includes(data.from)) {
                  temp.push(data.from);
                  setStranger(temp);
                }
              }
            })
        : await user
            .get("friends")
            .map()
            .once(async (e) => {
              friends.push(e.slice(1));
              gun
                .get("chat")
                .map()
                .once(async (data) => {
                  if (data.to === (await user.is.pub)) {
                    if (
                      !temp.includes(data.from) &&
                      !friends.includes(data.from)
                    ) {
                      temp.push(data.from);
                      setStranger(temp);
                    }
                  }
                });
            });
    };
    getIncomingMessages();
  }, [addFriend]);

  return (
    <div className="flex flex-col divide-y max-h-full overflow-y-auto overflow-x-hidden scrollbar">
      {stranger.map((e) => {
        return (
          <div
            className="hover:bg-blue-100/50 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            key={Math.random()}
            onClick={() => {
              addFriend(e);
            }}
          >
            <div className="flex items-center">
              <img
                className="inline-block h-14 w-14 rounded-full ring-2 ring-slate-100 bg-white mr-4"
                src={`https://avatars.dicebear.com/api/avataaars/${e}.svg`}
                alt=""
              />
              <div>
                <p className="text-black text-2xl">{e.slice(0, 10)}</p>
              </div>
            </div>
          </div>
        );
      })}
      <Toaster />
    </div>
  );
}
