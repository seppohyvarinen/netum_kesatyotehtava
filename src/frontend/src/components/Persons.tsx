import { useEffect, useState } from "react";
import axios from "axios";
import { ControlPanel } from "./ControlPanel";
import { Modal } from "./Modal";

export const Persons: React.FunctionComponent<{}> = () => {
  const [persons, setPersons] = useState<any>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(
    "Lisää uusi henkilö tietokantaan"
  );

  interface Person {
    LastName: string;
    FirstName: string;
    Age: number;
  }

  const fetchAll = async () => {
    try {
      var response = await axios.get<Person[]>("/persons");

      var temp: any = [];

      response.data.forEach(({ LastName, FirstName, Age }) =>
        temp.push({ LastName: LastName, FirstName: FirstName, Age: Age })
      );

      setPersons(temp);
    } catch (error) {
      alert(error);
    }
  };

  const renderPersons = persons.map((person: Person) => (
    <div
      className="Person"
      title="Klikkaa muokataksesi tai poistaaksesi sana"
      onClick={() => console.log("click")}
    >
      <span className="LastName">{person.LastName}</span>
      <span className="FirstName">{person.FirstName}</span>
      <span className="Age">{person.Age}</span>
    </div>
  ));

  const initializeEdit = (LastName: string, FirstName: string, Age: number) => {
    setMessage("Muokkaa tietoja: ");
    setEdit(true);
  };
  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <>
      {modalOpen && (
        <Modal message={message} edit={edit} setModalOpen={setModalOpen} />
      )}
      <ControlPanel setModalOpen={setModalOpen} />
      <div className="PersonList">
        <div className="HeaderContainer">
          {" "}
          <span className="LastNameHeader">Sukunimi</span>
          <span className="FirstNameHeader">Etunimi</span>
          <span className="AgeHeader">Ikä</span>
        </div>

        {renderPersons}
      </div>
    </>
  );
};
