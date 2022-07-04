import React from "react";
import { gun, user } from "../../useGun";

export default function Information() {
  const [allUsers, setAllUsers] = React.useState("");

  // getting all users count
  React.useEffect(() => {
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
    getUsersList();
  }, []);
  return (
    <div>
      <p>current user: {user.is.pub.slice(0, 25)}</p>
      <p>user registered: {allUsers.length}</p>
      <p>relay peers: <span className="bg-green-100 rounded-t px-2 py-0.5">http://localhost:3030/gun</span></p>
    </div>
  );
}
