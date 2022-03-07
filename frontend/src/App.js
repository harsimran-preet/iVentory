import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Welcome from "./components/welcome.component";
import Dashboard from "./screens/Dashboard/Dashboard";

function App() {
  let user = {
    userId: "6206ca0a0b2d60932d986465",
    inventoryList: [],
  };
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
                  <Link className="nav-link" to={"/dashboard"}>
                    Dashboard
                  </Link>
                </li>
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
                  <Link className="nav-link" to={"/create-item"}>
                    Create Item
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
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/welcome" component={Welcome} />
              <Route path="/dashboard">
                <Dashboard user={user} />
              </Route>
            </div>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
