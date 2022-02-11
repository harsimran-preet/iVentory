import React, { useState } from "react";

function CreateInventoryForm(props) {
  const [inventory, setInventory] = useState({
    name: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name == "name")
      setInventory({ name: value, description: inventory["description"] });
    if (name == "description")
      setInventory({ name: inventory["name"], description: value });
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
