import axios from "axios";
import { createStore } from "redux";
import React, { Component, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import MainScreen from "./MainScreen";
import Dashboard from "../screens/Dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "../index.css";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {});

  const submitHandler = async (e) => {
    e.preventDefault();
    async function getUser(userCred) {
      try {
        let result = await axios.get("http://localhost:5000/user", userCred);
        //setUsername(result["data"]["user"]["username"]);
        localStorage.setItem("userInfo", JSON.stringify(result));
        // console.log(result);
        return result;
      } catch (error) {
        // console.log(error);
        return false;
      }
    }
    const userCred = {
      params: {
        username: username,
        password: password,
      },
    };
    let result = await getUser(userCred);
    if (result.status === 200) {
      setAuthenticated(true);
    }
    // if (result.statusCode === 200)
    // console.log(username, password);
    props.handleUserLogin(userCred);
  };

  console.log(authenticated);
  if (!authenticated)
    return (
      <MainScreen>
        {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
        <form onSubmit={submitHandler}>
          <h3>Login</h3>
          <div className="form-group">
            <label>Username</label>
            <input
              type="username"
              className="form-control"
              value={username}
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </MainScreen>
    );
  else {
    console.log("ATHETNICATEd");

    return (
      <div>
        <Redirect to="/dashboard"></Redirect>
      </div>
    );
  }
}

export default Login;
