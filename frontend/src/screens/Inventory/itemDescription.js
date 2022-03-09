import React, { useState } from "react";
import "./itemDescription.css";
import { useParams } from "react-router-dom";
import { Circles } from "react-loading-icons";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";

/* /inventory/:inventoryId */
function ItemDescription(props) {
  let itemProperties = props.columnNames;
  let initialData = {};
  for (const property of itemProperties) {
    initialData[property] = "";
  }
  return (
    <div className="main">
      {itemProperties.map((propName) => {
        return (
          <Row>
            <Col xs={2} className="justify-content-end">
              {propName}
            </Col>
            <Col xs={4}></Col>
            <Col></Col>
          </Row>
        );
      })}
    </div>
  );
}

export default ItemDescription;
