import axios from "axios";
import React, { useState, useEffect } from "react";
import PopUp from "./PopUp";
import Table from "./Table";

function Dashboard(props) {
  const [seen, setSeen] = useState(false);
  const [inventories, setInventories] = useState([]);

  function togglePop() {
    setSeen(!seen);
  }

  async function getInventory(id) {
    let url = `http://localhost:5000/inventory/${id}`;
    try {
      const result = await axios.get(url);
      return result["data"]["inventory"];
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  function getUserInventories() {
    let inventoryIds = props.user["inventoryList"];
    let inventories = [];
    try {
      inventories = inventoryIds.map(getInventory);
    } catch (error) {
      console.log(error);
      return false;
    }
    console.log(inventories);
    return inventories;
  }

  async function createInventory(inventory) {
    try {
      const response = await axios.post(
        "http://localhost:5000/inventory",
        inventory
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function createInventoryCall(inventory) {
    createInventory(inventory).then((result) => {
      let inventory = result["data"]["inventory"];
      if (result !== undefined && result.status === 201)
        setInventories([...inventories, inventory]);
    });
  }

  async function deleteInventory(id) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/inventory/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function deleteInventoryCall(id) {
    deleteInventory(id).then((result) => {
      if (result !== undefined && result && result.status == 204)
        setInventories(
          inventories.filter((inv) => {
            return inv == null ? inv : inv["_id"] !== id;
          })
        );
    });
  }

  useEffect(() => {
    let inv = getUserInventories();
    Promise.all(inv).then((result) => {
      setInventories(result);
    });
  }, []);

  return (
    <div>
      <Table
        inventories={inventories}
        handleDelete={deleteInventoryCall}
      ></Table>
      <div className="btn" onClick={togglePop}>
        <button>Create Inventory</button>
      </div>
      {seen ? (
        <PopUp
          toggle={togglePop}
          handleCreate={createInventoryCall}
          userId={props.user["userId"]}
        />
      ) : null}
    </div>
  );
}

export default Dashboard;
