import GUN from "gun/gun";
import SEA from "gun/sea";

const peer = ["http://localhost:3030/gun"];

// initialize gun
const gun = GUN({
  peers: peer,
});

// create object references
const user = gun.user();

export { user, gun, SEA };
