import { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";

/**
 * Interface containing the types of the Props that the Modal component uses
 */

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;

  message: string;
  fetchAll: () => void;
}

/**
 * This function is the modal used to add a new person to the database.
 * @param setModalOpen is used to open and close the Modal.
 * @param message is the message displayed to the user.
 * @param fetchAll is the async function that fetches persons after the new person is added to the database
 * @returns a div that contains modal backgroung and the modal with inputs and buttons to add a new person to the database.
 */

export const Modal: React.FunctionComponent<Props> = ({
  setModalOpen,
  message,
  fetchAll,
}) => {
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [age, setAge] = useState<number>();

  /**
   * Handles setting the input value to lastName state
   * @param e is the React.FormEvent for HTML inputelement
   */

  const handleLastName = (e: React.FormEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
    console.log(lastName);
  };

  /**
   * Handles setting the input value to firstName state
   * @param e is the React.FormEvent for HTML inputelement
   */
  const handleFirstName = (e: React.FormEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
    console.log(lastName);
  };

  /**
   * Handles setting the input value to age state
   * @param e is the React.FormEvent for HTML inputelement
   */
  const handleAge = (e: React.FormEvent<HTMLInputElement>) => {
    setAge(e.currentTarget.valueAsNumber);
    console.log(age);
  };

  /**
   * This async function handles submitting the form and posting new person to backend with axios.post
   * @param e is the React.Formevent for HTML FormElement
   */

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
        <button className="exitBtn" onClick={() => setModalOpen(false)}>
          X
        </button>
        <div className="ModalHeader">
          <h3>{message}</h3>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
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
