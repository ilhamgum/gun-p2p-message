import React from "react";
import { useNavigate } from "react-router-dom";
import { gun, user } from "../useGun";

export default function Homepage() {
  const [alias, setAlias] = React.useState("");
  const [pub, setPub] = React.useState("");
  const [input, setInput] = React.useState("");
  const [users, setUsers] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    async function getInfo() {
      setPub(await user.get("pub"));
      setAlias(await user.get("alias"));
    }

    async function getFriendsAndMessages() {
      // get all data in friends graph
      await user
        .get("friends")
        .map()
        .on(async (data) => {
          // get original graph to retrieve alias
          await gun.get(data).once((ack) => {
            console.log(ack);
            //   var html = $(`<button>${ack.alias}</button>`);
            //   $("#friends").append(html);
            //   // on click get the data and display it
            //   html.on("click", async () => {
            //     console.log(
            //       new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString()
            //     );
            //     console.log(
            //       new Date(+new Date() - 1000 * 60 * 60 * 3).toISOString()
            //     );
            //     $(".msg").remove();
            //     $("#prompt").remove();
            //     $("#room").remove();
            //     // take the ack.pub value
            //     receiver = await ack.pub;
            //     $("#content").append(`
            //       <div id="room">
            //         <p id="userAlias">alias: ${ack.alias}</p>
            //         <p id="userPub">pubkey: ${ack.pub}</p>
            //         <div id="chats" style="width: 50%">
            //         </div>
            //         <input id="message" placeholder="insert a messsage"/>
            //         <button onClick="sendMessage()">Send</button>
            //       </div>
            //     `);
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

    // immediate exec
    getFriendsAndMessages();
    getInfo();
  }, []);

  async function addFriend() {
    let pub = `~${input}`;
    let exist; // state given if user exist

    // iterate through all list
    gun
      .get("userlist")
      .map()
      .once((ack) => (ack === pub ? (exist = true) : ""));

    // check if user exist
    if (exist === true) {
      if (pub === `~${user.is.pub}`) {
        console.log("gabisa add akun sendiri");
        setInput("");
      } else {
        console.log("ada");
        user.get("friends").set(pub);
        setInput("");
      }
    } else {
      console.log("ga ada");
      setInput("");
    }
  }

  async function getUsersList() {
    console.log("getUsersList run");
    // display how many users registered
    const users = [];
    if (gun.get("userlist") !== undefined) {
      gun
        .get("userlist")
        .map()
        .once((data) => {
          users.push(data);
          setUsers(users);
        });
    }
  }

  async function logout() {
    await user.leave();
    if (!user._.sea) {
      console.log("log out", user._.sea);
      navigate("/");
      window.location.reload();
    }
  }

  return (
    <div>
      <div id="container">
        <div>
          <p>Welcome, {alias} </p>
          <p>
            your pubKey:
            <input type="text" value={pub} readOnly />
          </p>
          <p>users count: {users.length}</p>
          <label htmlFor="pub">public address</label>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Enter pubkey"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={addFriend}
          >
            addFriend
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={getUsersList}
          >
            getUsersList
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
        <div>
          <p>friends</p>
          <div></div>
          <p>add and click friends to start chatting</p>
        </div>
      </div>
    </div>
  );
}
