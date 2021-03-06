import axios from "axios";
import React from "react";
import DashboardTable from "./DashboardTable";
import "./Dashboard.css";
import CreateInventoryForm from "./CreateInventoryForm";
import { Circles } from "react-loading-icons";

const PORT = 5000;

function Dashboard(props) {
  async function createInventory(inventory) {
    try {
      const response = await axios.post(
        `http://localhost:${PORT}/inventory`,
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
      console.log(result);
      if (result !== undefined && result.status === 201) props.updateUser();
    });
  }

  async function deleteInventory(id) {
    try {
      const response = await axios.delete(
        `http://localhost:${PORT}/inventory/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function deleteInventoryCall(id) {
    deleteInventory(id).then((result) => {
      console.log(result);
      if (result !== undefined && result && result.status === 204) {
        props.updateUser();
      }
    });
  }

  let inventories = props.user.inventoryList;

  if (inventories === undefined) return <Circles />;
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
