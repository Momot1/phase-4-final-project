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


  return (
    <BrowserRouter>
      <Navbar />

      <Switch>
        <Route exact path = "/"><Home/></Route>
        <Route path="/login"><Login/></Route>
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
