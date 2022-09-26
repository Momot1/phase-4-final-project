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
import ChangePassword from "./ChangePassword";
import NewProduct from "./NewProduct";
import "./css/app.css";
import UserProducts from "./UserProducts";

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Check if user is logged in
  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then(setUser);
      }
    });
  }, []);

  // Grab all the products in the DB
  useEffect(() => {
    fetch("/products")
      .then((resp) => resp.json())
      .then(setProducts);
  }, []);

  function onSortProducts() {
    fetch("/orderdproducts")
      .then((resp) => resp.json())
      .then(setProducts);
  }

  // Updates search value on search bar submitted
  function onSearch(search) {
    setSearch(search);
  }

  // Filters the products based on the search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BrowserRouter>
      <Navbar
        user={user}
        onSearchSubmit={onSearch}
        onSortProducts={onSortProducts}
      />

      <Switch>
        <Route exact path="/">
          <Home products={filteredProducts} setProducts={setProducts} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} user={user} />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} user={user} />
        </Route>
        <Route path="/cart">
          <Cart user={user} setUser={setUser} />
        </Route>
        <Route exact path="/products/new">
          <NewProduct
            user={user}
            products={products}
            setProducts={setProducts}
          />
        </Route>
        <Route path="/products/:id">
          <Product
            user={user}
            setUser={setUser}
            products={products}
            setProducts={setProducts}
          />
        </Route>
        <Route exact path="/:username/about">
          <UserProfile user={user} setUser={setUser} />
        </Route>
        <Route exact path="/:username/products">
          <UserProducts user={user} />
        </Route>
        <Route path="/logout">
          <Logout setUser={setUser} />
        </Route>
        <Route path="/:username/about/password/change">
          <ChangePassword user={user} setUser={setUser} />
        </Route>

        <Route path="/">404 NOT FOUND</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
