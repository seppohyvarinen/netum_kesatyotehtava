import { Dispatch, SetStateAction } from "react";
import Person from "../Interfaces";
/**
 * This interface contains types of the props that DeleteModal uses
 */
interface Props {
  handleDelete: (person: Person) => void;
  deleteThis: Person;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
}

/**
 * This component renders the delete modal to the screen that is called when the user clicks delete button from the person object.
 * @param handleDelete is the delete function from the Persons.tsx that is called when deleting.
 * @param deleteThis contains data of the person to be deleted.
 * @returns a modal background and modal that contains buttons that call functions for handling deletion or returning.
 */

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
