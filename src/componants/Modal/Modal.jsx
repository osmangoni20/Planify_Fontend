/* eslint-disable react/prop-types */
import { createContext, useContext, useRef } from "react";
import { createPortal } from "react-dom";

export const ModalContext = createContext();
const Modal = ({ isOpen, isClose, children, isSubmit }) => {
  const contentRef = useRef(null);
  const HandleOuterClose = (e) => {
    if (!contentRef.current?.contains(e.target)) {
      isClose();
    }
  };
  const ContextValue = { isClose, isSubmit };
  return createPortal(
    <ModalContext.Provider value={ContextValue}>
      <div>
        <div
          onClick={(e) => HandleOuterClose(e)}
          className={`fixed inset-0 flex justify-center items-center bg-gray-500/75  
                   ${isOpen ? "visible" : "invisible"}`}
        >
          <div
            ref={contentRef}
            className="relative text-black bg-white w-full max-w-sm rounded-lg  p-4"
          >
            <Modal.Close></Modal.Close>

            {children}
          </div>
        </div>
      </div>
    </ModalContext.Provider>,
    document.getElementById("portal")
  );
};

export default Modal;

const CloseButton = ({ children }) => {
  const { isClose } = useContext(ModalContext);
  return (
    <button onClick={isClose} className="absolute right-1 top-1">
      {children ? (
        <span className="text-xl font-semibold">{children}</span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 p-0.5 bg-primary rounded-md text-white"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      )}
    </button>
  );
};

export const SubmitButton = ({ children }) => {
  const { isSubmit } = useContext(ModalContext);
  return (
    <button
      onClick={isSubmit}
      className="mt-3 px-10 text-white font-semibold btn bg-primary hover:bg-secondary"
    >
      {children}
    </button>
  );
};
export const ModalHeader = ({ children }) => {
  return (
    <div className="text-center font-serif font-semibold text-2xl pb-5 pt-5">
      {children}
    </div>
  );
};
Modal.Header = ModalHeader;
Modal.Close = CloseButton;
Modal.Submit = SubmitButton;
