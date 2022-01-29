import { useEffect, useState } from "react";
import axios from "axios";

export const Persons: React.FunctionComponent<{}> = () => {
  const [persons, setPersons] = useState<any>([]);

  interface Person {
    LastName: string;
    FirstName: string;
    Age: number;
  }

  const fetchAll = async () => {
    try {
      var response = await axios.get<Person[]>("/persons");

      var mapped = response.data.map(({ LastName, FirstName, Age }) => (
        <div
          className="Words"
          title="Klikkaa muokataksesi tai poistaaksesi sana"
          onClick={() => console.log("click")}
        >
          {LastName + " - " + FirstName}
        </div>
      ));

      setPersons(mapped);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);
  return <div className="PersonList">{persons}</div>;
};
