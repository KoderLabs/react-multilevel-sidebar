import React, { useState } from "react";
import MultilevelSidebar from "../src/";

import "../src/Sidebar.css";
import options from "./Sidebar.config";

function App() {
  const [open, setOpen] = useState(false);

  const handleSidebarToggle = isOpen => {
    setOpen(isOpen);
  };

  return (
    <div>
      <Sidebar
        open={open}
        onToggle={handleSidebarToggle}
        options={options}
        header="React-MultiLevel-Sidebar"
      />
      <div>
        <button onClick={() => handleSidebarToggle(true)}>open</button>
      </div>
    </div>
  );
}

export default App;
