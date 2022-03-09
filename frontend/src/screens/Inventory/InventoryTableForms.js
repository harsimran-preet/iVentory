import React, { useState } from "react";
import Row from "react-bootstrap/Row";

export function ColumnForm(props) {
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
      <Row>
        <label>New Column Name</label>
        <input
          className="table-input"
          type="text"
          id="name"
          value={column.name}
          onChange={handleChange}
        />
      </Row>
      <button onClick={createColumn}>Create Column</button>
    </form>
  );
}

export function RowForm(props) {
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
          className="table-input"
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
export function ItemForm(props) {
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
          className="table-input"
          key={"input" + props.k}
          type="text"
          value={value}
          onChange={handleChange}
        />
      </Row>
      <button onClick={editItem} className="inventable-submit-button">
        <p>Edit Item</p>
      </button>
    </form>
  );
}
