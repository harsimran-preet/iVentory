import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Welcome extends Component {
  render() {
    return (
      <form>
        <h3 align="center">Welcome to iVentory</h3>
        <h6 align="center">Not associated with Apple</h6>
        <p></p>
        <p align="center">
          Leave inventory management to us. We’ll configure your inventory,
          organize your data, and upload it in just a few hours. All for Free
        </p>
        {/* <button type="submit" className="btn btn-primary btn-block">
          Login
        </button> */}
        <Link className="btn btn-primary btn-block" to={"/sign-in"}>
          Sing in
        </Link>

        <Link className="btn btn-primary btn-block" to={"/sign-up"}>
          Sign up
        </Link>
      </form>
    );
  }
}
