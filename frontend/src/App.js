import "./App.css";
import Dashboard from "./Dashboard";

function App() {
  let user = {
    userId: "6206ca0a0b2d60932d986465",
    inventoryList: [],
  };
  return <Dashboard user={user}></Dashboard>;
}

export default App;
