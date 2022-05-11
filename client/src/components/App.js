import Login from "./Login";
import Signup from "./Signup";
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Cart from "./Cart";
import Product from "./Product";
import UserProfile from "./UserProfile";

function App() {
  const [user, setUser] = useState(null)

  console.log(user)

  useEffect(() => {
    fetch('/me')
    .then(resp => {
      if(resp.ok){
        resp.json().then(setUser)
      }
    })
  }, [])

  function handleLogout(){
    fetch('/logout', {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(setUser)
  }

  return (
    <BrowserRouter>
      <Navbar user={user} handleLogout={handleLogout} />

      <Switch>
        <Route exact path = "/"><Home/></Route>
        <Route path="/login"><Login user={user} setUser={setUser}/></Route>
        <Route path="/signup"><Signup/></Route>
        <Route path="/cart"><Cart /></Route>
        <Route path="/products/:id"><Product /></Route>
        <Route path="/users/:username/about"><UserProfile /></Route>
        <Route path="/">404 NOT FOUND</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
