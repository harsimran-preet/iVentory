import React from "react";
import "./itemDescription.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "reactjs-popup/dist/index.css";
import { useLocation, Link } from "react-router-dom";
import { ItemForm } from "./InventoryTableForms";
import axios from "axios";

/* /inventory/:inventoryId */
function ItemDescription(props) {
  if (
    props.user === undefined ||
    props.user === null ||
    props.user.state === false
  )
    return <div></div>;
  console.log(props.user);
  const path = useLocation().pathname.split("/");
  // console.log(path.pathname.split("/"));
  const invId = path[2];
  const itemId = path[3];

  let inventory = undefined;
  for (const inv of props.user.inventoryList) {
    if (inv.inventoryId._id === invId) inventory = inv.inventoryId;
  }
  if (inventory === undefined) return <div></div>;
  let item = undefined;
  for (const it of inventory.inventoryTable) {
    if (it._id === itemId) item = it;
  }
  if (item === undefined) return <div></div>;

  function editItem(item, invId) {
    try {
      return axios.put(`http://localhost:5000/item/${invId}`, item);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  function editItemCall(item, invId) {
    console.log(item, invId);
    editItem(item, invId).then((result) => {
      if (result !== undefined && result !== null && result.status === 200) {
        props.updateUser();
      }
    });
  }

  return (
    <div className="item-description-out">
      <div className="item-description">
        <Row style={{ justifyContent: "right" }} key="itemrow">
          <Link
            to={`/inventory/${inventory._id}`}
            className="back-to-dashboard"
          >
            <h5>Back to Inventory</h5>
          </Link>
        </Row>
        <Row style={{ display: "flex", padding: "0px 0px 16px 0px" }}>
          <Col xs={3} key={"colname"}>
            <h5>Name</h5>
          </Col>
          <Col xs={3} key={"colval"}>
            <h5>Value</h5>
          </Col>
          <Col xs={4} key={"coledit"}>
            <h5>Edit Item Value</h5>
          </Col>
        </Row>
        {inventory.columnNames.map((name, index) => {
          return (
            <Row
              style={{ display: "flex", overflow: "auto" }}
              key={"itemrow" + index}
            >
              <Col xs={3} style={{ display: "flex" }} key={"colname" + index}>
                <p>{name}</p>
              </Col>
              <Col
                xs={3}
                style={{ justifyContent: "center" }}
                key={"colval" + index}
              >
                <p>
                  {item.values[index] === "" ? "|Empty|" : item.values[index]}
                </p>
              </Col>
              <Col xs={4} key={"coledit" + index}>
                <ItemForm
                  k={index}
                  handleEditItem={editItemCall}
                  invId={inventory._id}
                  itemId={item._id}
                  colName={name}
                />
              </Col>
            </Row>
          );
        })}
      </div>
    </div>
  );
  // return <div></div>;
  // return (
  //   <div className="main">
  //     {itemProperties.map((propName) => {
  //       return (
  //         <Row>
  //           <Col xs={2} className="justify-content-end">
  //             {propName}
  //           </Col>
  //           <Col xs={4}></Col>
  //           <Col></Col>
  //         </Row>
  //       );
  //     })}
  //   </div>
  // );
}

export default ItemDescription;
