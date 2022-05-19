import "./App.css";
import Gun from "gun/gun";

export default function App() {
  const gun = Gun({
    peers: ["http://localhost:3030/gun"],
  });
  const messages = gun.get("message");

  messages.map().on((e) => {
    console.log(e);
  });

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <label htmlFor="fname">Username:</label>
          <input type="text" id="fname" name="fname"></input>
          <label htmlFor="pass">Password:</label>
          <input type="password" id="pass" name="pass"></input>
          <input type="submit" id="login" name="login"></input>
          <input type="submit" id="register" name="register"></input>
        </form>
      </header>
    </div>
  );
}
