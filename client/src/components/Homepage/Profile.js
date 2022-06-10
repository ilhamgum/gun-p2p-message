import React from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../../useGun";

export default function Profile() {
  const [alias, setAlias] = React.useState("");
  const [pub, setPub] = React.useState("");

  const navigate = useNavigate();

  // getting user alias and pub
  React.useEffect(() => {
    async function getInfo() {
      setPub(await user.get("pub"));
      setAlias(await user.get("alias"));
    }
    getInfo();
  }, []);

  async function logout() {
    await user.leave();
    if (!user._.sea) {
      console.log("log out", user._.sea);
      navigate("/");
      window.location.reload();
    }
  }

  return (
    <div>
      <p>Welcome, {alias} </p>
      <p>
        your pubKey:
        <input type="text" value={pub} readOnly />
      </p>

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
