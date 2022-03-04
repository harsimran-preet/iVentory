import React, { useState } from "react";

function CreateInventoryForm(props) {
  const [inventory, setInventory] = useState({
    name: "",
    description: "",
    userId: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "name")
      setInventory({
        name: value,
        description: inventory["description"],
        userId: props.userId,
      });
    if (name === "description")
      setInventory({
        name: inventory["name"],
        description: value,
        userId: props.userId,
      });
  }

  function createInventory() {
    props.handleCreateInventory(inventory);
    setInventory({ name: "", description: "" });
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={inventory.name}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={inventory.description}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={createInventory} />
    </form>
  );
}

export default CreateInventoryForm;