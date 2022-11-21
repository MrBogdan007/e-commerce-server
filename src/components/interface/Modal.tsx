import CloseIcon from "@mui/icons-material/Close";

import { ModalInt } from "../../types/form";
import Form from "./Form";

const Modal = ({ signIn, setSignIn, item }: ModalInt) => {
  return (
    <>
      <div className="overlay">
        <div className="modal">
          <div
            onClick={() => {
              if (setSignIn) {
                setSignIn(!true);
              }
            }}
            className="modal-close"
          >
            <CloseIcon />
          </div>

          <div className="modal-form">
            <Form signIn={signIn} setSignIn={setSignIn} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
