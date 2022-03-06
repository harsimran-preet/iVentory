import axios from "axios";
import React, { useState, useEffect } from "react";
import DashboardTable from "./DashboardTable";
import "./Dashboard.css";
import CreateInventoryForm from "./CreateInventoryForm";

function Dashboard(props) {
  const [inventories, setInventories] = useState([]);

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
      props.updateUserInventories(inventory);
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
    setInventories(props.user["inventoryList"]);
  }, [props.user]);

  if (inventories === undefined) return <p>3</p>;
  else
    return (
      <div className="dashboard-inner">
        <DashboardTable
          inventories={inventories}
          handleDelete={deleteInventoryCall}
        ></DashboardTable>
        <CreateInventoryForm
          userId={props.user._id}
          handleCreateInventory={createInventoryCall}
        ></CreateInventoryForm>
      </div>
    );
}

export default Dashboard;
