import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import Row from "react-bootstrap/Row";
import "./InventoryTable.css";

function UserShare(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    function getUsername(userId) {
      try {
        return axios.get(`http://localhost:5000/name/${userId}`);
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    async function getAllUsers(userList) {
      let r = [];
      for (const user of userList) {
        r.push(getUsername(user.userId));
      }
      console.log(r);
      Promise.all(r).then((values) => {
        setUsers(
          values.map((value) => {
            return value["data"]["name"];
          })
        );
      });
      return r;
    }
    getAllUsers(props.userList);
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
