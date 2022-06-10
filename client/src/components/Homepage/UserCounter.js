import React from "react";
import { gun } from "../../useGun";

export default function UserCounter() {
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
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <p>users count: {allUsers.length}</p>
    </div>
  );
}
