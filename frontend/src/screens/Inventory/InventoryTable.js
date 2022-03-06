import React from "react";
import "./InventoryTable.css";
import { useParams } from "react-router-dom";
import { Circles } from "react-loading-icons";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { MdAdd } from "react-icons/md";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

/* /inventory/:inventoryId */
function InventoryTable(props) {
  if (props.user.inventoryList === undefined) return <Circles />;
  const inventoryId = useParams()["inventoryId"];
  let inventory;
  for (const inv of props.user.inventoryList) {
    if (inv.inventoryId !== null && inv.inventoryId !== undefined) {
      if (inv.inventoryId._id === inventoryId) inventory = inv.inventoryId;
    }
  }

  console.log(inventory);
  return (
    <div className="table-inner">
      <h2>Inventory: {inventory.name}</h2>
      <h5>{inventory.description}</h5>
      <Link to="/dashboard">
        <Row className="back-button">
          <h5>Back to Dashboard</h5>
        </Row>
      </Link>
      <div className="inventory-table">
        <table>
          <InventoryTableHeader columnNames={inventory.columnNames} />
          <InventoryTableBody rows={inventory.inventoryTable} />
        </table>
      </div>
    </div>
  );
}

function InventoryTableHeader(props) {
  let columns = props.columnNames.map((name) => {
    return (
      <th className="inventable-th" key={name}>
        {name}
      </th>
    );
  });
  return (
    <thead>
      <tr>
        {columns}
        <th>
          <button className="inventable-button">
            <MdAdd size={24} className="inventable-add" />
          </button>
        </th>
      </tr>
    </thead>
  );
}

function InventoryTableBody(props) {
  // for indexing extra 1 for tr html element
  const numItems = props.rows.length + 1;
  let rows = props.rows.map((item, rowidx) => {
    let cols = item.values.map((value, colidx) => {
      const idx = rowidx * numItems + (colidx + 1);
      if (value === "") {
        return (
          <td className="inventable-empty-td" key={idx}>
            <p>|Empty|</p>
          </td>
        );
      }
      return (
        <td className="inventable-td" key={idx}>
          <p>{value}</p>
        </td>
      );
    });
    return (
      <tr className="inventable-tr" key={rowidx * numItems}>
        {cols}
      </tr>
    );
  });
  return (
    <tbody className="iventable-tbody">
      {rows}
      <tr>
        <td>
          <button className="inventable-button">
            <MdAdd size={24} className="inventable-add" />
          </button>
        </td>
      </tr>
    </tbody>
  );
}

export default InventoryTable;
