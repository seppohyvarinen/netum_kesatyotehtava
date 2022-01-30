import { useEffect, useState } from "react";
import axios from "axios";
import { ControlPanel } from "./ControlPanel";

export const Persons: React.FunctionComponent<{}> = () => {
  const [persons, setPersons] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
          className="Person"
          title="Klikkaa muokataksesi tai poistaaksesi sana"
          onClick={() => console.log("click")}
        >
          <span className="LastName">{LastName}</span>
          <span className="FirstName">{FirstName}</span>
          <span className="Age">{Age}</span>
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
  return (
    <>
      <ControlPanel setModalOpen={setModalOpen} />
      <div className="PersonList">
        <div className="HeaderContainer">
          {" "}
          <span className="LastNameHeader">Sukunimi</span>
          <span className="FirstNameHeader">Etunimi</span>
          <span className="AgeHeader">Ikä</span>
        </div>

        {persons}
      </div>
    </>
  );
};
