import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./CreateItem.css";

const onOptChange = () => {
  if (document.getElementById("qtyDropdown").value == "other") {
    document.getElementById("optionalDiv").hidden = false;
  } else {
    document.getElementById("optionalDiv").hidden = true;
    document.getElementsByName("quantity").value =
      document.getElementById("qtyDropdown").value;
  }
};

const CreateItem = () => {
  async function createItem(inventory) {
    let response;
    try {
      response = await axios.post("http://localhost:5000/inventory", inventory);
    } catch (error) {
      console.log(error);
    }
    response.then((result) => {
      let item = result["data"]["item"];
      if (result !== undefined && result.status === 201);
      /*setInventories([...inventories, inventory]);*/
    });

    let data;
    for (const colname of columnNames) {
      data[colname] = "";
    }
    setItem(data);
  }

  let columnNames = ["name", "quantity", "date"];
  let initialData = {};
  for (const name of columnNames) {
    initialData[name] = "";
  }

  const [item, setItem] = useState(initialData);

  function handleChange(event) {
    const { name, value } = event.target;
    let newData = {};
    for (const colname of columnNames) {
      if (name.valueOf() === colname.valueOf()) {
        newData[colname] = value;
      } else {
        newData[colname] = item[colname];
      }
      setItem(newData);
    }
  }
  console.log(item);
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Create Item</h1>
              <p className="subtitle">Add information to create a new item</p>
              <form className="input">
                <div className="app">
                  <div className="scroller">
                    {columnNames.map((colName) => {
                      return (
                        <Row>
                          <Col xs={2} className="justify-content-end">
                            {colName}
                          </Col>
                          <Col xs={4}>
                            <input
                              type="text"
                              name={colName}
                              class="input"
                              onChange={handleChange}
                            />
                          </Col>
                          <Col></Col>
                        </Row>
                      );
                    })}
                  </div>
                </div>
              </form>
            </div>
            <div className="buttonContainer">
              <a href="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  onClick={createItem}
                >
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
