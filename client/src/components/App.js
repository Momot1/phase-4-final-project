import Login from "./Login";
import Signup from "./Signup";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch("/me")
    .then(resp => resp.json())
    .then(setUser)
  }, [])

  function handleLogout(){
    fetch("/logout", {method: "DELETE"}).then(resp => resp.json()).then(() => setUser({}))
  }

  return (
    <div>
      <h1>Hello {user.name}</h1>
      <Login/>
      <Signup/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;
