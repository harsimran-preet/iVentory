import React from "react";
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
        <tr key={index} className="dashboard-row">
          <td>{inventory.inventoryId._id}</td>
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
        <tr key={index} className="dashboard-row">
          <td>Inventory Not Found</td>
        </tr>
      );
  });

  return <tbody>{rows}</tbody>;
}

export default DashboardTable;
