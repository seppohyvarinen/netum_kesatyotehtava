import { useState, Dispatch, SetStateAction } from "react";

interface Props {
  initializeAdd: () => void;
}

export const ControlPanel: React.FunctionComponent<Props> = ({
  initializeAdd,
}) => {
  return (
    <div className="ControlPanel">
      <button onClick={() => initializeAdd()}>Lisää uusi henkilö</button>
      <select>
        <option value="" disabled selected>
          Järjestä...
        </option>
        <option value="LastName">Sukunimi</option>
        <option value="FirstName">Etunimi</option>
        <option value="Age">Ikä</option>
      </select>
    </div>
  );
};
