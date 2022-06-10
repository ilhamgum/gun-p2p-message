import React from "react";

export default function Chat({ pub, alias }) {
  const [newMessage, setNewMessage] = React.useState("");
  return (
    <div>
      <p>alias: {alias} </p>
      <p>pubkey: {pub} </p>
      {/* chats */}
      <input
        type="text"
        placeholder="insert a messsage"
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => console.log("sent", newMessage)}
      >
        Send
      </button>
    </div>
  );
}
