import React from "react";
import "./InventoryTable.css";
import { useParams } from "react-router-dom";
import { Circles } from "react-loading-icons";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { MdAdd, MdPerson } from "react-icons/md";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { ColumnForm, RowForm, ItemForm } from "./InventoryTableForms";
import UserShare from "./UserShare";

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

  // console.log(props.user);

  return (
    <div className="table-inner">
      <h2>Inventory: {inventory.name}</h2>
      <h5>{inventory.description}</h5>

      <Row className="back-button">
        <Link to="/dashboard" className="back-to-dashboard">
          <h5>Back to Dashboard</h5>
        </Link>
        <Popup
          trigger={
            <button>
              <MdPerson size={28}></MdPerson>
            </button>
          }
        >
          <UserShare userList={inventory.permissions}></UserShare>
        </Popup>
      </Row>
      <div className="inventory-table">
        <table>
          <InventoryTableHeader
            columnNames={inventory.columnNames}
            invId={inventory._id}
            updateUser={props.updateUser}
          />
          <InventoryTableBody
            rows={inventory.inventoryTable}
            columnNames={inventory.columnNames}
            invId={inventory._id}
            updateUser={props.updateUser}
          />
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

  async function createColumn(column) {
    try {
      return axios.post(`http://localhost:5000/column/${props.invId}`, column);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  function createColumnCall(column) {
    createColumn(column).then((result) => {
      if (
        result !== undefined &&
        result !== null &&
        result.statusCode === 201
      ) {
        props.updateUser();
      }
    });
  }

  return (
    <thead>
      <tr>
        {columns}
        <th>
          <Popup
            className="my-popup"
            trigger={
              <button className="inventable-button">
                <MdAdd size={24} className="inventable-add" />
              </button>
            }
          >
            <ColumnForm handleCreateColumn={createColumnCall} />
          </Popup>
        </th>
      </tr>
    </thead>
  );
}

function InventoryTableBody(props) {
  async function createRow(row) {
    try {
      return axios.post(`http://localhost:5000/item/${props.invId}`, {
        item: row,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  function createRowCall(row) {
    createRow(row).then((result) => {
      if (
        result !== undefined &&
        result !== null &&
        result.statusCode === 201
      ) {
        // props.updateUser();
      }
    });
  }

  function editItemCall(item) {
    console.log(item);
  }

  // for indexing extra 1 for tr html element
  const numItems = props.rows.length + 1;
  let rows = props.rows.map((item, rowidx) => {
    let cols = item.values.map((value, colidx) => {
      // idx of Row element and td elements left to right, top to bottom
      const idx = rowidx * numItems + (colidx + 1);
      if (value === "") {
        return (
          <td className="inventable-empty-td" key={idx}>
            <Popup
              className="my-popup"
              trigger={
                <button className="inventable-item">
                  <p>|Empty|</p>
                </button>
              }
            >
              <ItemForm
                handleEditItem={editItemCall}
                k={idx}
                itemId={item._id}
                colName={props.columnNames[colidx]}
              />
            </Popup>
          </td>
        );
      }
      return (
        <td className="inventable-td" key={idx}>
          <Popup
            className="my-popup"
            trigger={
              <button className="inventable-item">
                <p>{value}</p>
              </button>
            }
          >
            <ItemForm
              handleEditItem={editItemCall}
              k={idx}
              itemId={item._id}
              colName={props.columnNames[colidx]}
            />
          </Popup>
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
          <Popup
            trigger={
              <button className="inventable-button">
                <MdAdd size={24} className="inventable-add" />
              </button>
            }
          >
            <RowForm
              handleCreateRow={createRowCall}
              columnNames={props.columnNames}
            />
          </Popup>
        </td>
      </tr>
    </tbody>
  );
}

export default InventoryTable;
