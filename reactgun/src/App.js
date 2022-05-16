import "./App.css";
import Gun from "gun/gun";

const gun = Gun({
  peers: ["http://localhost:3030/gun"],
});
const messages = gun.get("message");

messages.map().on((e) => {
  console.log(e);
});

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <label htmlFor="fname">First name:</label>
          <input type="text" id="fname" name="fname"></input>
        </form>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
