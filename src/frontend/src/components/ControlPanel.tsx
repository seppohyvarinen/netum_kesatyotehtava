import { useState, Dispatch, SetStateAction } from "react";

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ControlPanel: React.FunctionComponent<Props> = ({
  setModalOpen,
}) => {
  return (
    <div className="ControlPanel">
      <button onClick={() => setModalOpen(true)}>Lisää</button>
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
