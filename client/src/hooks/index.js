import { user, gun, SEA } from "./useGun";

// hooks
function createUser(username, password) {
  user.create(username, password, (ack) => {
    console.log(ack);
  });
}

function authUser(username, password) {
  user.auth(username, password, (ack) => {
    console.log("logged in, public key:", ack.get);
  });
}

async function authPair(setKey) {
  const pair = await SEA.pair((ack) =>
    console.log("pair cb |", JSON.stringify(ack))
  );
  user.auth(pair, (ack) => {
    setKey(JSON.stringify(pair));
    console.log("success", ack);
  });
}

function authKeyPair(key) {
  user.auth(key, (ack) => console.log("success", ack));
}

function logout() {
  user.leave();
  if (user._.sea) {
    console.log("not logout", user._.sea);
  } else {
    console.log("logged out", user._.sea);
  }
}

function check() {
  if (user.is) {
    console.log("loggedin, key= ", user.is);
  } else {
    console.log("not logged in", user.is);
  }
}

// clean export
export {
  createUser,
  authKeyPair,
  authPair,
  authUser,
  logout,
  check,
  user,
  SEA,
  gun,
};
