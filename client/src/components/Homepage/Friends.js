import React from "react";
import { gun, user } from "../../useGun";
import Context from "../../contexts/context";

export default function Friends() {
  const [friends, setFriends] = React.useState([]);

  const { setSelected } = React.useContext(Context);
  
  React.useEffect(() => {
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
    getFriends();
  }, []);

  return (
    <>
      <div className="flex flex-col divide-y max-h-full overflow-y-auto scrollbar">
        {friends.map((e) => (
          <div
            className="hover:bg-blue-100/50 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            key={e.pub}
            onClick={() => {
              setSelected(e);
            }}
          >
            <div className="flex items-center">
              <img
                className="inline-block h-14 w-14 rounded-full ring-2 ring-slate-100 bg-white mr-4"
                src={`https://avatars.dicebear.com/api/avataaars/${e.alias}.svg`}
                alt=""
              />
              <div>
                <p className="text-black text-2xl">{e.alias}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
