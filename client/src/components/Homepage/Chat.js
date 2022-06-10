import React from "react";
import { user, SEA, gun, GUN } from "../../useGun";

export default function Chat({ pub, alias }) {
  const [newMessage, setNewMessage] = React.useState("");
  const [allMessages, setAllMessages] = React.useState([]);
  // const [filteredMessages, setFilteredMessages] = React.useState([]);
  const userPub = [user.is.pub, pub];

  // get messages (credits: https://github.com/fireship-io/gun-chat with some changes)
  React.useEffect(() => {
    // var match = {
    //   // lexical queries are kind of like a limited RegEx or Glob.
    //   ".": {
    //     // property selector
    //     ">": new Date(+new Date() - 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
    //   },
    //   "-": 1, // filter in reverse
    // };
    async function getMessages() {
      // reset previous state if exist
      setAllMessages([])
      // iterate chat graph
      gun
        .get("chat")
        .map() // match
        .on(async (data) => {
          if (data) {
            const key = "#foo"; // Key for end-to-end encryption
            const message = {
              what: (await SEA.decrypt(data.what, key)) + "", // force decrypt as text.
              when: GUN.state.is(data, "what"), // get the internal timestamp for the what property.
              from: data.from,
              to: data.to,
            };

            // if the 'from' and 'to' is same as 1st user || 2nd user pub in friend list get it and display
            if (userPub.includes(data.from) && userPub.includes(data.to)) {
              setAllMessages((old) => [...old, message]);
            }
          }
        });
    }
    getMessages();
  }, [pub]);

  // send message func
  async function sendMessage() {
    const pubs = {
      sender: await user.is.pub,
      receiver: pub,
    };
    const encryptedMessage = await SEA.encrypt(newMessage, "#foo");
    const message = {
      what: encryptedMessage,
      from: pubs.sender,
      to: pubs.receiver,
    };
    const index = new Date().toISOString();
    gun.get("chat").get(index).put(message);
    setNewMessage("");
  }
  
  return (
    <div>
      <p>alias: {alias} </p>
      <p>pubkey: {pub} </p>
      {allMessages.map((e) => {
        const timeConvert = new Date(e.when).toLocaleTimeString();
        return (
          <div key={e.what}>
            <p>{e.what}</p>
            <p>{timeConvert}</p>
          </div>
        );
      })}
      <input
        type="text"
        placeholder="insert a messsage"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
