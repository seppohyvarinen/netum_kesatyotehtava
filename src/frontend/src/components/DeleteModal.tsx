import Person from "../Interfaces";

interface Props {
  handleDelete: (person: Person) => void;
}

export const DeleteModal: React.FunctionComponent<Props> = () => {
  return (
    <div className="modalBG">
      <div className="deleteModal">Delete?</div>
    </div>
  );
};
