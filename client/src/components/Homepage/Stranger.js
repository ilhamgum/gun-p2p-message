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
        user.get("friends").set(pub);
        toast.success("added as friend, let's holla at them! 💫, page will reload", {
          duration: 3000,
        });
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
              setTimeout(() => window.location.reload(), 1000)
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

// if (user.is.pub === data.to) {
//   const who = {
//     from: data.from,
//     to: data.to,
//   };
//   if (!stranger.includes(who)) setStranger((old) => [...old, who]);
// }

// if (data.to === e.slice(1) || !data.from === (await user.is.pub)) {
//   console.log("dont", data.from, "||", e.slice(1));
// } else {
//   console.log("do", data.from, e.slice(1));
//   if (!stranger.includes(data.from)) {
//     setStranger((old) => [...old, data.from]);
//   }
// }

// setStranger([]);
// iterate chat graph
// gun
//   .get("chat")
//   .map()
//   .once(async (data) => {
//     if (data.to === (await user.is.pub)) {
//       console.log("masuk");
//       if (!(await user.get("friends"))) {
//         console.log("undf friend, ada ga?", stranger.includes(data.from));
//         if (stranger.includes(data.from)) {
//           console.log("udah ada");
//         } else {
//           setStranger((old) => [...old, data.from]);
//         }
//       } else {
//         console.log("not undf");
//       }
//   await user
//     .get("friends")
//     .map()
//     .once(async (e) => {
//       console.log(e);
//       if (data.to === e.slice(1)) {
//         console.log("sama get from: ", data.from);
//         if (!data.from === (await user.is.pub)) {
//           console.log("dari orang");
//           if (stranger.includes(data.from)) {
//             console.log("ga ada di list ", stranger);
//           } else {
//             console.log("ada di list ", stranger);
//           }
//         } else {
//           console.log("diri sendiri XX", data.from === user.is.pub);
//         }
//       } else {
//         console.log("ini apaan");
//       }
//     });
// }
//     }
//   });

// iterate friends
// filter data that not in temp & friend list
// push
