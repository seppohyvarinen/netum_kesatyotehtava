import { useState, Dispatch, SetStateAction } from "react";
import { SearchBar } from "./SearchBar";

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
      <div className="AddBtn">
        <button onClick={() => initializeAdd()}>Lisää uusi henkilö</button>
      </div>
      <div className="OrderOptions">
        {" "}
        <select onChange={(e) => handleSort(e)}>
          <option value="" disabled selected>
            Järjestä...
          </option>
          <option value="LastName">Sukunimi</option>
          <option value="FirstName">Etunimi</option>
          <option value="Age Asc">Ikä - nuorin</option>
          <option value="Age Desc">Ikä - vanhin</option>
        </select>
      </div>

      <SearchBar />
    </div>
  );
};
