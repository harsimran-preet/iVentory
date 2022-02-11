import logo from "./logo.svg";
import "./App.css";
import CreateInventoryForm from "./CreateInventoryForm";
import axios from "axios";

function App() {
  async function createInventory(inventory) {
    try {
      const response = await axios.post(
        "http://localhost:5000/inventory",
        inventory
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <div className="Form">
      <CreateInventoryForm
        handleCreateInventory={createInventory}
      ></CreateInventoryForm>
    </div>
  );
}

export default App;
