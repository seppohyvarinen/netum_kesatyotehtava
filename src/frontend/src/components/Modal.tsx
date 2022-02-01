import { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";

import Person from "../Interfaces";

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  message: string;
  fetchAll: () => void;
  person: Person;
}

export const Modal: React.FunctionComponent<Props> = ({
  setModalOpen,
  edit,
  setEdit,
  message,
  fetchAll,
  person,
}) => {
  const [lastName, setLastName] = useState<string>(person.LastName);
  const [firstName, setFirstName] = useState<string>(person.FirstName);
  const [age, setAge] = useState<number>(person.Age);

  const handleLastName = (e: React.FormEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
    console.log(lastName);
  };
  const handleFirstName = (e: React.FormEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
    console.log(lastName);
  };
  const handleAge = (e: React.FormEvent<HTMLInputElement>) => {
    setAge(e.currentTarget.valueAsNumber);
    console.log(age);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/persons", {
        FirstName: firstName,
        LastName: lastName,
        Age: age,
      });
      setFirstName("");
      setLastName("");
      setAge(0);
      setModalOpen(false);
      fetchAll();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="modalBG">
      <div className="Modal">
        <button
          className="exitBtn"
          onClick={() => (edit ? setEdit(false) : setModalOpen(false))}
        >
          X
        </button>
        <div className="ModalHeader">
          <h3>{message}</h3>
        </div>

        <form onSubmit={(e) => (edit ? console.log("what") : handleSubmit(e))}>
          <div className="EditInputs">
            <div className="InputRow">
              {" "}
              Sukunimi
              <input
                type={"text"}
                onChange={handleLastName}
                value={lastName}
              ></input>
            </div>
            <div className="InputRow">
              {" "}
              Etunimi
              <input
                type={"text"}
                onChange={handleFirstName}
                value={firstName}
              ></input>
            </div>
            <div className="InputRow">
              {" "}
              Ikä
              <input type={"number"} onChange={handleAge} value={age}></input>
            </div>
          </div>
          <div className="ModalBtns">
            <button type="submit">Lisää</button>
            <button onClick={() => setModalOpen(false)}>Peruuta</button>
          </div>
        </form>
      </div>
    </div>
  );
};
