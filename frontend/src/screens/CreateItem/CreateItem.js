import React from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./CreateItem.css";

const onOptChange = () => {
  if (document.getElementById("qtyDropdown").value=="other"){
    document.getElementById("optionalDiv").hidden = false
  }else{
    document.getElementById("optionalDiv").hidden = true
    document.getElementsByName("quantity").value = document.getElementById("qtyDropdown").value
  }
}

const CreateItem = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Create Item</h1>
              <p className="subtitle">Add information to create a new item</p>
              <form className="input">
                <Row>
                  <Col xs={2} className="justify-content-end">
                    Item Name :
                  </Col>
                  <Col xs={4}>
                    <input type="text" name="name" class="input"/>
                  </Col>
                  <Col></Col>
                </Row>
                <br></br>
                <Row>
                  <Col xs={2}>
                  Quantity : 
                  </Col>
                  <Col xs={4}>
                  <select id="qtyDropdown" onChange={onOptChange} class="input">
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="other">other</option>
                  </select>
                  <div hidden="true" id="optionalDiv">
                    <input type="text" name="quantity" class="input" />
                  </div>
                  </Col>
                  <Col></Col>
                </Row>
                <br></br>
                <Row>
                  <Col xs={2}>
                    Description:
                  </Col>
                  <Col xs={4}>
                  <textarea name="description" class="input" />
                  </Col>
                  <Col></Col>
                </Row>
              </form>
            </div>
            <div className="buttonContainer">
              <a href="/register">
                <Button size="lg" className="landingbutton">
                  Submit
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};


export default CreateItem;
