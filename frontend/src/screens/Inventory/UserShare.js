import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import Row from "react-bootstrap/Row";
import "./InventoryTable.css";

function UserShare(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    function getUsername(userId) {
      //   console.log(userId);
      try {
        return axios.get(`http://localhost:5000/name/${userId}`);
        // console.log("rr", rr);
        // return rr["data"];
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    async function getAllUsers(userList) {
      let r = [];
      for (const user of userList) {
        // console.log(user);
        r.push(getUsername(user.userId));
      }
      //   Promise.all(r);
      console.log(r);
      Promise.all(r).then((values) => {
        setUsers(
          values.map((value) => {
            return value["data"]["name"];
          })
        );
      });
      //   console.log(r);
      return r;
    }
    let result = getAllUsers(props.userList);
    // setUsers(result);
    // console.log(result);
  }, []);
  if (users.length === 0) return <div></div>;
  else {
    console.log(users);
    let usernames = users.map((user, index) => {
      return (
        <Row key={"users" + index} className="userrows">
          <h5>{user.username}</h5>
        </Row>
      );
    });
    return <div>{usernames}</div>;
  }
}
export default UserShare;
