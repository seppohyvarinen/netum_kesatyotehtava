import { Dispatch, SetStateAction } from "react";
import Person from "../Interfaces";

interface Props {
  handleDelete: (person: Person) => void;
  deleteThis: Person;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
}

export const DeleteModal: React.FunctionComponent<Props> = ({
  handleDelete,
  deleteThis,
  setDeleteModal,
}) => {
  return (
    <div className="modalBG">
      <div className="deleteModal">
        <div className="deleteText">
          {" "}
          Haluatko varmasti poistaa henkilön {deleteThis.FirstName}{" "}
          {deleteThis.LastName} tietokannasta?
        </div>
        <div className="deleteModalButtons">
          <button onClick={() => handleDelete(deleteThis)}>Kyllä</button>
          <button onClick={() => setDeleteModal(false)}>Peruuta</button>
        </div>
      </div>
    </div>
  );
};
