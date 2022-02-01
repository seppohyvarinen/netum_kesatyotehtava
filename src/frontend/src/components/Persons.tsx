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
    ID: number;
  }

  const fetchAll = async () => {
    try {
      var response = await axios.get<Person[]>("/persons");

      var temp: any = [];

      response.data.forEach(({ LastName, FirstName, Age, ID }) =>
        temp.push({
          LastName: LastName,
          FirstName: FirstName,
          Age: Age,
          ID: ID,
        })
      );

      setPersons(temp);
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (person: Person) => {
    try {
      await axios.delete("/persons", {
        data: person,
      });

      await fetchAll();

      setEdit(false);
    } catch (error) {
      alert(error);
    }
  };

  const renderPersons = persons.map((person: Person) => (
    <span
      className="Person"
      title="Klikkaa muokataksesi tai poistaaksesi sana"
      onClick={() => initializeEdit(person)}
    >
      <span className="LastName">{person.LastName}</span>
      <span className="FirstName">{person.FirstName}</span>
      <span className="Age">{person.Age}</span>
      <span className="EditButton">
        <button>
          <i className="fa fa-pencil"></i>{" "}
        </button>
      </span>
      <span className="DeleteButton">
        <button
          onClick={() => {
            window.confirm(`Poista henkilö ${person.FirstName} ? `) &&
              handleDelete(person);
          }}
        >
          X
        </button>
      </span>
    </span>
  ));

  const initializeEdit = (person: Person) => {
    setMessage("Muokkaa tietoja: ");
    setEdit(true);
  };
  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <>
      {modalOpen && (
        <Modal
          message={message}
          edit={edit}
          setModalOpen={setModalOpen}
          fetchAll={fetchAll}
        />
      )}

      <ControlPanel setModalOpen={setModalOpen} />
      <div className="PersonList">
        <div className="HeaderContainer">
          {" "}
          <span className="LastNameHeader">Sukunimi</span>
          <span className="FirstNameHeader">Etunimi</span>
          <span className="AgeHeader">Ikä</span>
          <span className="emptyspaceHeader"></span>
        </div>

        {renderPersons}
      </div>
    </>
  );
};
