import React from "react";

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        inventories={props.inventories}
        handleDelete={props.handleDelete}
      />
    </table>
  );
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.inventories.map((row, index) => {
    if (row !== null)
      return (
        <tr key={index}>
          <td>{row._id}</td>
          <td>{row.name}</td>
          <td>{row.description}</td>
          <td>
            <button onClick={() => props.handleDelete(row._id)}>Delete</button>
          </td>
        </tr>
      );
    else
      return (
        <tr key={index}>
          <td>Inventory Not Found</td>
        </tr>
      );
  });

  return <tbody>{rows}</tbody>;
}

export default Table;
