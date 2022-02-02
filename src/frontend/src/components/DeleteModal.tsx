import Person from "../Interfaces";

interface Props {
  handleDelete: (person: Person) => void;
  deleteThis: Person;
}

export const DeleteModal: React.FunctionComponent<Props> = ({
  handleDelete,
  deleteThis,
}) => {
  return (
    <div className="modalBG">
      <div className="deleteModal">
        Haluatko varmasti poistaa henkilön {deleteThis.FirstName}{" "}
        {deleteThis.LastName} tietokannasta?
      </div>
    </div>
  );
};
