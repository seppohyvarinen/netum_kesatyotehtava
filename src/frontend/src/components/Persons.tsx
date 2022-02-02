import { useEffect, useState } from "react";
import axios from "axios";
import { ControlPanel } from "./ControlPanel";
import { Modal } from "./Modal";
import { EditModal } from "./EditModal";
import Person from "../Interfaces";
import { DeleteModal } from "./DeleteModal";

/**
 * Persons component holds the persons list that is in the frontend and most of the functions used in the app for managing the list.
 * @returns conditionally Modals for deleting, adding and editing persons, also ControlPanel component and the list of persons.
 */

export const Persons: React.FunctionComponent<{}> = () => {
  const [persons, setPersons] = useState<any>([]);
  const [filtPersons, setFiltPersons] = useState<any>([]);

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
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  /**
   * Async function that fetches all the persons with axios.get to the frontend.
   * Uses sortState in the request params to fetch correctly sorted list.
   */

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
      setFiltPersons(temp);
    } catch (error) {
      alert(error);
    }
  };

  /**
   * This function handles the filtering according to what is written in the searchbar.
   * @param filterBy is a string that the list filtering is done by.
   */

  const FilterPersons = (filterBy: string) => {
    const filtered = persons.filter((person: Person) => {
      return (
        person.FirstName.toLowerCase().includes(filterBy.toLowerCase()) ||
        person.LastName.toLowerCase().includes(filterBy.toLowerCase())
      );
    });
    setFiltPersons(filtered);
  };

  /**
   * This function handles the sorting of the list. User can sort the list
   * according to lastname, firstname and age.
   * @param byThis is string that serves as condition as how the sorting should be done.
   */

  const sort = (byThis: string) => {
    var temp = [];
    if (byThis === "Age Asc") {
      temp = [...persons];
      temp.sort(function (a, b) {
        return a.Age - b.Age;
      });
      setFiltPersons(temp);
    } else if (byThis === "Age Desc") {
      temp = [...persons];
      temp.sort(function (a, b) {
        return b.Age - a.Age;
      });
      setFiltPersons(temp);
    } else if (byThis === "LastName") {
      temp = [...persons];
      temp.sort((a, b) => a.LastName.localeCompare(b.LastName));
      setFiltPersons(temp);
    } else if (byThis === "FirstName") {
      temp = [...persons];
      temp.sort((a, b) => a.FirstName.localeCompare(b.FirstName));
      setFiltPersons(temp);
    }
  };

  /**
   * This async function handles the deleting from the database.
   * @param person contains Person object that is sent with the request to teh backend
   */

  const handleDelete = async (person: Person) => {
    try {
      await axios.delete("/persons", {
        data: person,
      });

      await fetchAll();
      setDeleteModal(false);
    } catch (error) {
      alert(error);
    }
  };

  /**
   * This function handles the rendering of the persons list to the screen.
   * It maps the persons list to divs that have styling and also the divs contain buttons that
   * call functions for editing and deleting.
   */

  const renderPersons = filtPersons.map((person: Person) => (
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
        <button onClick={() => initializeDelete(person)}>X</button>
      </span>
    </span>
  ));

  /**
   * This function initializes editing by setting desired Person to editable state that is sent to the EditModal.
   * It also sets the setEdit true which will enable rendering of the EditModal.
   * @param person is the Person that is to be edited
   */

  const initializeEdit = (person: Person) => {
    setMessage("Muokkaa tietoja: ");
    setEditable(person);
    setEdit(true);
  };

  /**
   * This function initializes adding a person.
   * It sets the setModalOpen true which will enable rendering of the Modal.
   *
   */

  const initializeAdd = () => {
    setMessage("Lisää uusi henkilö tietokantaan");
    setModalOpen(true);
  };

  /**
   * This function initializes deleting by setting desired Person to editable state that is sent to the DeleteModal.
   * It also sets the setEdit true which will enable rendering of the DeleteModal.
   * @param person is the Person that is to be deleted
   */

  const initializeDelete = (person: Person) => {
    setEditable(person);
    setDeleteModal(true);
  };

  /**
   * This function uses useEffect that calls fetchAll function to fetch all persons as the component is loaded.
   */

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

      {deleteModal && (
        <DeleteModal
          deleteThis={editable}
          handleDelete={handleDelete}
          setDeleteModal={setDeleteModal}
        />
      )}

      <ControlPanel
        initializeAdd={initializeAdd}
        sort={sort}
        setSortState={setSortState}
        filterPersons={FilterPersons}
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
