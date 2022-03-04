import axios from "axios";
import React, { useState, useEffect } from "react";
import DashboardTable from "./DashboardTable";
import "./Dashboard.css";
import CreateInventoryForm from "./CreateInventoryForm";

function Dashboard(props) {
  const [inventories, setInventories] = useState([]);
  console.log(props);

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
      if (result !== undefined && result && result.status === 204)
        setInventories(
          inventories.filter((inv) => {
            return inv == null ? inv : inv["_id"] !== id;
          })
        );
    });
  }

  useEffect(() => {
    function getUserInventories() {
      let inventoryIds = props.user["inventoryList"].map((input) => {
        return input["inventoryId"];
      });
      let inventories = [];
      try {
        inventories = inventoryIds.map(getInventory);
      } catch (error) {
        console.log(error);
        return false;
      }

      return inventories;
    }
    let inv = getUserInventories();
    Promise.all(inv).then((result) => {
      setInventories(result);
    });
  }, [props.user]);
  return (
    <div className="dashboard-inner">
      <DashboardTable
        inventories={inventories}
        handleDelete={deleteInventoryCall}
      ></DashboardTable>
      <CreateInventoryForm
        handleCreateInventory={createInventoryCall}
      ></CreateInventoryForm>
    </div>
  );
}

export default Dashboard;
