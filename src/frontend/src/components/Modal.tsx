import { useState, Dispatch, SetStateAction } from "react";

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const Modal: React.FunctionComponent<Props> = ({ setModalOpen }) => {
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [message, setMessage] = useState<string>(
    "Lisää uusi henkilö tietokantaan"
  );

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

  const handleSubmit = () => {
    setModalOpen(false);
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

        <form onSubmit={() => handleSubmit}>
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
