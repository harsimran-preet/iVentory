import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <form>
        <br></br>
        <br></br>
        <h3>Login</h3>

        <div className="form-group">
          <label>Username</label>
          <input
            type="username"
            className="form-control"
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
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
        <br></br>
        <br></br>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
        {/* <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p> */}
      </form>
    );
  }
}
