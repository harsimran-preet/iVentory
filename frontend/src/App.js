import React, { useState, useEffect, forceUpdate } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Welcome from "./components/welcome.component";
import Dashboard from "./screens/Dashboard/Dashboard";
import InventoryTable from "./screens/Inventory/InventoryTable";
import ItemDescription from "./screens/Inventory/itemDescription";
import axios from "axios";

function App() {
  const [userCred, setUserCred] = useState({ username: "", password: "" });
  const [user, setUser] = useState({ state: false });

  useEffect(() => {
    async function getUser(userCred) {
      try {
        let result = await axios.get("http://localhost:5000/user", userCred);
        setUser(result["data"]["user"]);
      } catch (error) {
        // console.log(error);
        return false;
      }
    }
    // const userCred = {
    //   params: {
    //     username: "example",
    //     password: "examplepassword",
    //   },
    // };
    if (!getUser(userCred)) {
      console.log("Invalid Username or Password");
    }
  }, [userCred]);

  function handleUserLogin(userCred) {
    // console.log(userCred);
    setUserCred(userCred);
  }

  function updateUser() {
    forceUpdate(user);
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/welcome"}>
              iVentory
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/dashboard"}>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/item"}>
                    Item Description
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Route exact path="/" component={Login} />
              <Route path="/login">
                <Login handleUserLogin={handleUserLogin} />
              </Route>
              <Route path="/sign-up" component={SignUp} />
              <Route path="/welcome" component={Welcome} />
              <Route path="/dashboard">
                <Dashboard user={user} updateUser={updateUser}></Dashboard>
              </Route>
              <Route path="/inventory/:inventoryId">
                <InventoryTable user={user} updateUser={updateUser} />
              </Route>
              <Route path="/item">
                <ItemDescription user={user} updateUser={updateUser} />
              </Route>
            </div>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
