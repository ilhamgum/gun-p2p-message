import React from "react";
import { gun, user, SEA, GUN } from "../../useGun";

export default function Friends() {
  const [friends, setFriends] = React.useState([]);
  const [selected, setSelected] = React.useState({});
  // messaging state
  const [newMessage, setNewMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  // get friend list
  const getFriends = async () => {
    setFriends([]);
    // get all data in friends graph
    await user
      .get("friends")
      .map()
      .on(async (data) => {
        // get original graph to retrieve alias
        gun.get(data).once((ack) => {
          setFriends((old) => [...old, ack]);
        });
      });
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
          const key = "#foo"; // Key for end-to-end encryption
          const message = {
            what: (await SEA.decrypt(data.what, key)) + "",
            when: GUN.state.is(data, "what"),
            from: data.from,
            to: data.to,
          };

          const userPub = [user.is.pub, selected.pub];
          if (userPub.includes(data.from && data.to)) {
            setMessages((old) => [...old, message]);
          }
        }
      });
  }, [selected]);

  // send message func
  const sendMessage = async () => {
    const message = {
      what: await SEA.encrypt(newMessage, "#foo"),
      from: await user.is.pub,
      to: selected.pub,
    };
    const index = new Date().toISOString();
    gun.get("chat").get(index).put(message);
    setNewMessage("");
    getMessages()
  };

  React.useEffect(() => {
    getFriends();
  }, []);

  React.useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <div>
      <p>Friends</p>
      {friends.map((e) => (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          key={e.pub}
          onClick={() => setSelected(e)}
        >
          {e.alias}
        </button>
      ))}
      {selected.pub ? (
        <div>
          <p>alias: {selected.alias} </p>
          <p>pubkey: {selected.pub} </p>
          <div>
            {messages.map((e) => { console.log(e)
              return (
                <div key={e.when}>
                  <p>{e.what}</p>
                  <p>{new Date(e.when).toLocaleTimeString()}</p>
                </div>
              );
            })}
          </div>
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
      ) : (
        <p>add and click friends to start chatting</p>
      )}
    </div>
  );
}
