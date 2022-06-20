import React from "react";
import { gun, user } from "../../useGun";

export default function AddFriend() {
  const [input, setInput] = React.useState("");

  async function addFriend() {
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
        console.log("gabisa add akun sendiri");
        setInput("");
      }
      // input already in friend list
      else if (existInFriendList === true) {
        console.log("sudah berteman");
        setInput("");
      }
      // user exist in userlist and can be add to friend list
      else {
        console.log("ada");
        user.get("friends").set(pub);
        setInput("");
      }
    }
    // input not match with any pub in userlist
    else {
      console.log("ga ada");
      setInput("");
    }
  }
  return (
    <div className="w-full">
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
        add
      </button>
    </div>
  );
}
