import React, { useState } from "react";
import "./InventoryTable.css";
import { useParams } from "react-router-dom";
import { Circles } from "react-loading-icons";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { MdAdd } from "react-icons/md";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";

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

function ColumnForm(props) {
  const [column, setColumn] = useState({ name: "" });

  function createColumn() {
    props.handleCreateColumn(column);
    setColumn({ name: "" });
  }

  function handleChange(event) {
    const { value } = event.target;
    setColumn({ name: value });
  }

  return (
    <form>
      <label>New Column Name</label>
      <input
        type="text"
        id="name"
        value={column.name}
        onChange={handleChange}
      />
      <button onClick={createColumn}>Create Column</button>
    </form>
  );
}

function RowForm(props) {
  const initValues = (names) => {
    let initVal = {};
    for (const n of names) initVal[n] = "";
    return initVal;
  };
  const [values, setValues] = useState(initValues(props.columnNames));

  function createRow() {
    props.handleCreateRow(values);
    setValues(initValues(props.columnNames));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    let copy = JSON.parse(JSON.stringify(values));
    copy[name] = value;
    setValues(copy);
  }

  let inputVals = props.columnNames.map((name, index) => {
    let value = values[index];
    return (
      <Row key={index * 3}>
        <label key={index * 3 + 1}>{name}</label>
        <input
          key={index * 3 + 2}
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </Row>
    );
  });

  return (
    <form>
      {inputVals}
      <button onClick={createRow}>Create Item</button>
    </form>
  );
}

// props.k - itemform index
// props.handleEditItem - api call to edit the item
// props.itemId - itemId for props.handleEditItem
// props.colName - column name of the value you are editing
function ItemForm(props) {
  const [value, setValue] = useState("");

  function handleChange(event) {
    const v = event.target.value;
    setValue(v);
  }

  function editItem() {
    const item = {
      itemId: props.itemId,
      value: value,
      colName: props.colName,
    };
    props.handleEditItem(item);
    // setValue("");
  }

  return (
    <form>
      <Row key={props.k}>
        <label key={"item" + props.k}>New Value</label>
        <input
          key={"input" + props.k}
          type="text"
          value={value}
          onChange={handleChange}
        />
        <button onClick={editItem}>
          <p>Edit</p>
        </button>
      </Row>
    </form>
  );
}

export default InventoryTable;
