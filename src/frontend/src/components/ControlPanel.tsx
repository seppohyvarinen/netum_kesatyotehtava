import { useState, Dispatch, SetStateAction } from "react";

interface Props {
  initializeAdd: () => void;

  setSortState: Dispatch<SetStateAction<string>>;

  sort: (byThis: string) => void;
}

export const ControlPanel: React.FunctionComponent<Props> = ({
  initializeAdd,

  sort,
  setSortState,
}) => {
  const handleSort = (e: React.FormEvent<HTMLSelectElement>) => {
    let targetValue = e.currentTarget.value;
    setSortState(targetValue);
    sort(targetValue);
  };
  return (
    <div className="ControlPanel">
      <button onClick={() => initializeAdd()}>Lisää uusi henkilö</button>
      <select onChange={(e) => handleSort(e)}>
        <option value="" disabled selected>
          Järjestä...
        </option>
        <option value="LastName">Sukunimi</option>
        <option value="FirstName">Etunimi</option>
        <option value="Youngest">Ikä - nuorin</option>
        <option value="Oldest">Ikä - vanhin</option>
      </select>
    </div>
  );
};
