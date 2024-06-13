/* eslint-disable react/prop-types */
import { createContext, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";

export const ModalContext = createContext();
const AddTaskModal = ({ isOpen, isClose, isSubmit }) => {
  const { handleSubmit, register } = useForm();
  const contentRef = useRef(null);
  const HandleOuterClose = (e) => {
    if (!contentRef.current?.contains(e.target)) {
      isClose();
    }
  };

  const onSubmit = (data) => {
    console.log(data);
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
            {/* close Button */}
            <AddTaskModal.Close></AddTaskModal.Close>

            {/* Modal Body */}
            <div>
              <h1 className="text-center font-serif font-extralight p-10">
                Create New Task
              </h1>
              <form
                className="min-w-[720px] p-5 shadow  rounded-md"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-2 gap-5">
                  <div className="w-full my-2">
                    <label className="text-bold block" htmlFor="task_title">
                      Task Title
                    </label>
                    <input type="text" id="task_title" {...register("task_title")} />
                  </div>

                  <div className="w-full my-2">
                    <label className="text-bold " htmlFor="task_deadline">
                      Deadlines
                    </label>
                    <input
                      type="date"
                      id="task_deadline"
                      {...register("task_deadline")}
                    />
                  </div>

                  <div className="w-full my-2">
                    <label className="text-bold " htmlFor="task_priority">
                      Task Priority
                    </label>
                    <select id="task_priority" {...register("task_priority")}>
                      <option value={"low_priority"}>Low</option>
                      <option value={"medium_priority"}> Medium</option>
                      <option value={"high_priority"}>High</option>
                    </select>
                  </div>

                  <div className="w-full my-2">
                    <label className="text-bold block" htmlFor="task_description">
                      Task Description
                    </label>
                    <textarea type="text" id="task_description" {...register("task_description")} />
                  </div>

                </div>
                <div className="flex justify-center">
                    <AddTaskModal.Submit>
                    <input
                    type="submit"
                    value={"Create"}
                    className="font-bold text-lg bg-primary text-white p-4 rounded"
                  ></input>
                    </AddTaskModal.Submit>
                 
                </div>
              </form>
            </div>
       
          </div>
        </div>
      </div>
    </ModalContext.Provider>,
    document.getElementById("portal")
  );
};

export default AddTaskModal;

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
AddTaskModal.Header = ModalHeader;
AddTaskModal.Close = CloseButton;
AddTaskModal.Submit = SubmitButton;
