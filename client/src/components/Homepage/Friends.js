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
