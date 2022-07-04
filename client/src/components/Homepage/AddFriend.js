import React from "react";
import { gun, user } from "../../useGun";
import toast, { Toaster } from "react-hot-toast";

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
        toast.error("can't add yourself to the list");
        setInput("");
      }
      // input already in friend list
      else if (existInFriendList === true) {
        toast.error("already in your friend list");
        setInput("");
      }
      // user exist in userlist and can be add to friend list
      else {
        user.get("friends").set(pub);
        toast.success("added as friend, let's holla at them! 💫", {
          duration: 3000,
        });
        setInput("");
      }
    }
    // input not match with any pub in userlist
    else {
      toast.error("user not exist");
      setInput("");
    }
  }
  return (
    <div className="w-full">
      <input
        className="w-80 rounded-full text-center"
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Enter pubkey"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ml-4"
        type="button"
        onClick={addFriend}
      >
        add
      </button>
      <Toaster />
    </div>
  );
}
