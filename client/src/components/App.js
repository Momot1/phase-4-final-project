import Login from "./Login";
import Signup from "./Signup";
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Cart from "./Cart";
import Product from "./Product";
import UserProfile from "./UserProfile";
import Logout from "./Logout";

function App() {

  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])

  // console.log(user)

  useEffect(() => {
    fetch('/me')
    .then(resp => {
      if(resp.ok){
        resp.json().then(setUser)
      }
    })
  }, [])

  useEffect(() => {
    fetch("/products")
    .then(resp => resp.json())
    .then(setProducts)
  }, [])

  console.log(products)

  return (
    <BrowserRouter>
      <Navbar user={user} />

      <Switch>
        <Route exact path = "/"><Home products={products} setProducts={setProducts}/></Route>
        <Route path="/login"><Login setUser={setUser}/></Route>
        <Route path="/signup"><Signup setUser={setUser}/></Route>
        <Route path="/cart"><Cart /></Route>
        <Route path="/products/:id"><Product /></Route>
        <Route path="/:username/about"><UserProfile /></Route>
        <Route path="/logout"><Logout setUser={setUser}/></Route>
        <Route path="/">404 NOT FOUND</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
