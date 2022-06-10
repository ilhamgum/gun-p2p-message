import React from "react";
// compos
import Friends from "../components/Homepage/Friends";
import UserCounter from "../components/Homepage/UserCounter";
import Profile from "../components/Homepage/Profile";
import AddFriend from "../components/Homepage/AddFriend";

export default function Homepage() {
  return (
    <>
      <Profile />
      <AddFriend />
      <Friends />
      <UserCounter />
    </>
  );
}
