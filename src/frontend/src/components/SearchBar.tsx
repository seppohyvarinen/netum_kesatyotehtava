import { useState, useEffect } from "react";

/**
 * This interface contains props that the SearchBar component uses
 */

interface Props {
  filterPersons: (filterBy: string) => void;
}

/**
 * This component renders searchbar that works in real time.
 * @param filterPersons is the function from Persons.tsx that handles filtering the list that is rendered to the user.
 * @returns A form that contains input for the user to type search parameters in to.
 */

export const SearchBar: React.FunctionComponent<Props> = ({
  filterPersons,
}) => {
  const [searchParams, setSearchParams] = useState<string>("");

  /**
   * filterPersons function is called in useEffect when searchParams state is changed
   * to ensure search is done in real time.
   */

  useEffect(() => {
    filterPersons(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  /**
   * Handles setting the searchParams state when user types.
   * @param e is the React.FormEvent for HTML input element
   */

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchParams(e.currentTarget.value);
  };

  return (
    <div className="Searchcomponent">
      {" "}
      <form onSubmit={handleSubmit}>
        <label>
          <span className="visually-hidden">Search todos</span>
        </label>
        <input
          type="text"
          className="Searchbar"
          placeholder="Etsi henkilöitä..."
          onChange={handleChange}
          value={searchParams}
        />
        <button type="submit">Etsi</button>
      </form>
    </div>
  );
};
