import React from "react";
import { gun, user } from "../../useGun";
import Chat from "./Chat";

export default function Friends() {
  const [friends, setFriends] = React.useState([]);
  const [selected, setSelected] = React.useState("");

  // when user clicked
  const [isClicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    async function getFriends() {
      // get all data in friends graph
      await user
        .get("friends")
        .map()
        .on(async (data) => {
          // get original graph to retrieve alias
          gun.get(data).once((ack) => {
            setFriends((old) => [...old, ack]);
            //     // get messages (credits: https://github.com/fireship-io/gun-chat with some changes)
            //     var match = {
            //       // lexical queries are kind of like a limited RegEx or Glob.
            //       ".": {
            //         // property selector
            //         ">": new Date(+new Date() - 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
            //       },
            //       "-": 1, // filter in reverse
            //     };
            //     gun
            //       .get("chat")
            //       .map() // match
            //       .on(async (data, id) => {
            //         if (data) {
            //           const key = "#foo", // Key for end-to-end encryption
            //             what = (await SEA.decrypt(data.what, key)) + "", // force decrypt as text.
            //             // when = GUN.state.is(data, "what"), // get the internal timestamp for the what property.
            //             when = GUN.state.is(data, "what"),
            //             from = data.from,
            //             to = data.to,
            //             userPub = [await user.is.pub, receiver];
            //           // if the 'from' and 'to' is same as 1st user || 2nd user pub in friend list get it and display
            //           if (userPub.includes(from) && userPub.includes(to)) {
            //             const timeConvert = new Date(when).toLocaleTimeString();
            //             // determine its a sender or receiver
            //             if (from === (await user.is.pub)) {
            //               $("#chats").append(`
            //               <div class="msg" style="display: flex; justify-content: flex-end;">
            //                 <p style="font-size: 12px">${timeConvert}</p>
            //                 <p>${what}</p>
            //               </div>
            //             `);
            //             } else {
            //               $("#chats").append(`
            //               <div class="msg" style="display: flex; justify-content: flex-start;">
            //                 <p>${what}</p>
            //                 <p style="font-size: 12px">${timeConvert}</p>
            //               </div>
            //             `);
            //             }
            //           }
            //         }
            //       });
            //   });
          });
        });
    }
    getFriends();
  }, []);
  return (
    <div>
      <p>Friends</p>
      {friends.map((e) => (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          key={e.pub}
          onClick={() => {
            setSelected(e);
            setClicked(true);
          }}
        >
          {e.alias}
        </button>
      ))}
      {isClicked ? (
        <Chat pub={selected.pub} alias={selected.alias} />
      ) : (
        <p>add and click friends to start chatting</p>
      )}
    </div>
  );
}
