import React from "react";
import { gun, user } from "../../useGun";
import Context from "../../contexts/context";

export default function Friends() {
  const [friends, setFriends] = React.useState([]);

  const { setSelected } = React.useContext(Context);

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

  React.useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className="flex flex-col divide-y">
      {friends.map((e) => (
        <div
          className="hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          key={e.pub}
          onClick={() => {
            setSelected(e);
          }}
        >
          <div className="flex items-center border-2">
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-white mr-2"
              src={`https://avatars.dicebear.com/api/avataaars/${e.alias}.svg`}
            />
            <p className="text-black">{e.alias}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
