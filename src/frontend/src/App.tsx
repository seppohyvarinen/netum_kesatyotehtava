import React from "react";
import { FunctionPanel } from "./components/ControlPanel";
import { Persons } from "./components/Persons";

function App() {
  return (
    <div className="App">
      <FunctionPanel />
      <Persons />
    </div>
  );
}

export default App;
