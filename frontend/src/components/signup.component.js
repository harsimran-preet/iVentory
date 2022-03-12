import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp(props) {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  function register() {
    console.log(user);
    props.handleUserRegister(user);
  }

  function handleChange(event) {
    console.log(user);
    const { name, value } = event.target;
    if (name === "name")
      setUser({
        name: value,
        username: user["username"],
        email: user["email"],
        password: user["password"],
      });
    if (name === "username")
      setUser({
        name: user["name"],
        username: value,
        email: user["email"],
        password: user["password"],
      });
    if (name === "email")
      setUser({
        name: user["name"],
        username: user["username"],
        email: value,
        password: user["password"],
      });
    if (name === "password")
      setUser({
        name: user["name"],
        username: user["username"],
        email: user["email"],
        password: value,
      });
  }

  return (
    <form>
      <h3>Sign Up</h3>

      <div className="form-group">
        <label>Full name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          className="form-control"
          placeholder="Enter full name"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          className="form-control"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          value={user.email}
          className="form-control"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          className="form-control"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block"
        onClick={register}
      >
        Sign Up
      </button>
      <button style={{ color: "black", backgroundColor: "white" }}>
        <Link to="/login">
          <p>Already Registered?</p>
        </Link>
      </button>
    </form>
  );
}

export default SignUp;
