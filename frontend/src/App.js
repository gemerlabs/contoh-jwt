import { useState, useContext } from "react";
// import fetch from "node-fetch";
import { useAuthContext } from "./context/AuthContext";
import logo from "./logo.svg";

function App() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { token, setToken } = useAuthContext();

  const handleUsernameChanged = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();

    const data = await fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await data.json();
    setToken(result.token);

    localStorage.setItem("_token", result.token);
  };

  return (
    <div>
      <form onSubmit={handleLoginForm}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" onChange={handleUsernameChanged} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" onChange={handlePasswordChanged} />
        </div>

        <button>Login</button>
      </form>

      <button onClick={() => console.log(token)}>Call Token</button>
    </div>
  );
}

export default App;
