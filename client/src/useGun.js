import GUN from "gun/gun";
import SEA from "gun/sea";
import "gun";

// initialize gun
const gun = GUN({ peers: ["http://localhost:3030/gun"], localStorage: false });

// create object references
const user = gun.user().recall({ sessionStorage: true });

export { gun, user, SEA, GUN };
