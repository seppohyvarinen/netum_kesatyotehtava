import { useEffect, useState } from "react";
import axios from "axios";
import { ControlPanel } from "./ControlPanel";
import { Modal } from "./Modal";
import { EditModal } from "./EditModal";
import Person from "../Interfaces";

export const Persons: React.FunctionComponent<{}> = () => {
  const [persons, setPersons] = useState<any>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(
    "Lisää uusi henkilö tietokantaan"
  );
  const [editable, setEditable] = useState<Person>({
    LastName: "",
    FirstName: "",
    Age: 0,
    ID: 0,
  });

  const [sortState, setSortState] = useState<string>("LastName");

  const fetchAll = async () => {
    try {
      var response = await axios.get<Person[]>("/persons", {
        params: {
          sortBy: sortState,
        },
      });

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
      console.log(persons);
    } catch (error) {
      alert(error);
    }
  };

  const sort = (byThis: string) => {
    if (byThis === "Age Asc") {
      var temp = [...persons];
      temp.sort(function (a, b) {
        return a.Age - b.Age;
      });
      setPersons(temp);
    } else if (byThis === "Age Desc") {
      var temp = [...persons];
      temp.sort(function (a, b) {
        return b.Age - a.Age;
      });
      setPersons(temp);
    } else if (byThis === "LastName") {
      var temp = [...persons];
      temp.sort((a, b) => a.LastName.localeCompare(b.LastName));
      setPersons(temp);
    } else if (byThis === "FirstName") {
      var temp = [...persons];
      temp.sort((a, b) => a.FirstName.localeCompare(b.FirstName));
      setPersons(temp);
    }
  };

  const handleDelete = async (person: Person) => {
    try {
      await axios.delete("/persons", {
        data: person,
      });

      await fetchAll();
    } catch (error) {
      alert(error);
    }
  };

  const renderPersons = persons.map((person: Person) => (
    <span className="Person" title="Klikkaa muokataksesi tai poistaaksesi sana">
      <span className="LastName">{person.LastName}</span>
      <span className="FirstName">{person.FirstName}</span>
      <span className="Age">{person.Age}</span>
      <span className="EditButton">
        <button onClick={() => initializeEdit(person)}>
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
    setEditable(person);
    setEdit(true);
  };

  const initializeAdd = () => {
    setMessage("Lisää uusi henkilö tietokantaan");
    setModalOpen(true);
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {modalOpen && (
        <Modal
          message={message}
          setModalOpen={setModalOpen}
          fetchAll={fetchAll}
        />
      )}

      {edit && (
        <EditModal
          message={message}
          setEdit={setEdit}
          person={editable}
          fetchAll={fetchAll}
        />
      )}

      <ControlPanel
        initializeAdd={initializeAdd}
        sort={sort}
        setSortState={setSortState}
      />
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
