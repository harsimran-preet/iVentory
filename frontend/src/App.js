import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Welcome from "./components/welcome.component";
import Dashboard from "./screens/Dashboard/Dashboard";

function App() {
  const [user, setUser] = useState({
    userId: "6206ca0a0b2d60932d986465",
    inventoryList: [
      {
        inventoryId: "6209fd4c597be1a721481924",
        _id: "6209fd4c597be1a721481931",
      },
      {
        inventoryId: "620ac01f1b60f67c6e895b04",
        _id: "620ac0201b60f67c6e895b11",
      },
      {
        inventoryId: "62180b4b3890a3a14267dd5d",
        _id: "62180b4b3890a3a14267dd6b",
      },
    ],
  });

  function updateInventories(inventory) {
    console.log(inventory._id);
    setUser({
      userId: user["userId"],
      inventoryList: [...user["inventoryList"], inventory],
    });
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
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/Dashboard"}>
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/welcome" component={Welcome} />
              <Route path="/dashboard">
                <Dashboard
                  user={user}
                  updateUserInventories={updateInventories}
                ></Dashboard>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
