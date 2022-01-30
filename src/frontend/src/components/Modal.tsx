import { useState, Dispatch, SetStateAction } from "react";

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const Modal: React.FunctionComponent<Props> = ({ setModalOpen }) => {
  return (
    <div className="modalBG">
      <div className="Modal">
        <button className="exitBtn" onClick={() => setModalOpen(false)}>
          X
        </button>
      </div>
    </div>
  );
};
