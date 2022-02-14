import React from "react";
import CreateInventoryForm from "./CreateInventoryForm";

function PopUp(props) {
  function handleClick() {
    props.toggle();
  }

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;{" "}
        </span>
        <CreateInventoryForm
          userId={props.userId}
          handleCreateInventory={props.handleCreate}
        />
      </div>
    </div>
  );
}

export default PopUp;
