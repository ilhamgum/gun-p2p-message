import React from "react";
import { gun, user } from "../../useGun";

export default function Information() {
  const [allUsers, setAllUsers] = React.useState("");
  const [peers, setPeers] = React.useState([]);

  // getting all users count
  React.useEffect(() => {
    async function getPeers() {
      setPeers([]);
      Object.keys(gun._.opt.peers).forEach(function (key) {
        setPeers((old) => [...old, key]);
      });
    }
    async function getUsersList() {
      const users = [];
      if (gun.get("userlist") !== undefined) {
        gun
          .get("userlist")
          .map()
          .once((data) => {
            users.push(data);
            setAllUsers(users);
          });
      }
    }
    getPeers();
    getUsersList();
  }, []);
  return (
    <div>
      <p>
        current user:{" "}
        <span className="bg-green-100 rounded py-0.5">{user.is.pub}</span>
      </p>
      <p>user registered: {allUsers.length}</p>
      <p>
        relay peers:{" "}
        {peers.map((e) => (
          <p className="bg-green-100 rounded py-0.5">{e}</p>
        ))}
      </p>
    </div>
  );
}
