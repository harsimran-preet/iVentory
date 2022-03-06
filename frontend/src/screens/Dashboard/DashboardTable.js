import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function DashboardTable(props) {
  return (
    <table className="dashboard-table">
      <TableHeader />
      <TableBody
        inventories={props.inventories}
        handleDelete={props.handleDelete}
      ></TableBody>
    </table>
  );
}

function TableHeader() {
  return (
    <thead>
      <tr className="dashboard-row">
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.inventories.map((inventory, index) => {
    if (
      inventory !== null &&
      inventory.inventoryId !== undefined &&
      inventory.inventoryId !== null
    )
      return (
        <tr key={inventory.inventoryId._id} className="dashboard-row">
          <td>
            <Link to={`/inventory/${inventory.inventoryId._id}`}>
              {inventory.inventoryId._id}
            </Link>
          </td>
          <td>{inventory.inventoryId.name}</td>
          <td>{inventory.inventoryId.description}</td>
          <td>
            <button onClick={() => props.handleDelete(inventory._id)}>
              Delete
            </button>
          </td>
        </tr>
      );
    else
      return (
        <tr key={inventory.inventoryId._id} className="dashboard-row">
          <td>Inventory Not Found</td>
        </tr>
      );
  });

  return <tbody>{rows}</tbody>;
}

export default DashboardTable;
