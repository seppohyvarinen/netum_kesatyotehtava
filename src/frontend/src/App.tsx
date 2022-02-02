import React from "react";
import { HeaderPanel } from "./components/HeaderPanel";
import { Persons } from "./components/Persons";

/**
 * Main component of the App.
 * @returns div with components HeaderPanel and Persons inside
 */

function App() {
  return (
    <div className="App">
      <HeaderPanel />
      <Persons />
    </div>
  );
}

export default App;
