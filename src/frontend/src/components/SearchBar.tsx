import { useState } from "react";

export const SearchBar: React.FunctionComponent<{}> = () => {
  const [searchParams, setSearchParams] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("search functionality");
  };

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
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
