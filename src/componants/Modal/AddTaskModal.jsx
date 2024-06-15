/* eslint-disable react/prop-types */
import { createContext, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const ModalContext = createContext();
const AddTaskModal = ({ isOpen, isClose }) => {
  const { handleSubmit, register } = useForm();
  const contentRef = useRef(null);
  const HandleOuterClose = (e) => {
    if (!contentRef.current?.contains(e.target)) {
      isClose();
    }
  };
  const url="http://localhost:3000/create_task"
  const notify = (message) => toast(message);
 
  const onSubmit = async(data) => {
    
    await fetch(url,{
      method:"POST",
      headers:{
          "Content-type":"application/json"
      },
      body:JSON.stringify({...data,status:"todo"})
  }).then(res=>res.json())
  .then(async()=>{
    
      isClose()
    notify("Add Successfully Done")
  })
  };

  return createPortal(
    <ModalContext.Provider value={isClose}>
      <div>
        <div
          onClick={(e) => HandleOuterClose(e)}
          className={`fixed inset-0  flex justify-center items-center bg-gray-500/75  
                   ${isOpen ? "visible" : "invisible"}`}
        >
          <div
            ref={contentRef}
            className="relative text-black bg-white w-full max-h-screen max-w-md rounded-lg  p-4"
          >
            {/* close Button */}
            <AddTaskModal.Close></AddTaskModal.Close>

            {/* Modal Body */}
            <div>
              <h1 className="text-center font-serif font-extralight p-2">
                Create New Task
              </h1>
              <form
                className=" p-2 shadow  rounded-md "
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-1 gap-5">
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
    <button onClick={isClose} className="absolute right-2 top-3">
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

export const SubmitButton = () => {
  return (
    <button
     
    >
      {/* {children} */}
      <input
                    type="submit"
                    value={"Create"}
                    className="font-bold cursor-pointer text-lg btn_solid "
                  ></input>
    </button>
  );
};
export const ModalHeader = ({ children }) => {
  return (
    <div className="text-center font-serif font-semibold text-2xl pt-5">
      {children}
    </div>
  );
};
AddTaskModal.Header = ModalHeader;
AddTaskModal.Close = CloseButton;
AddTaskModal.Submit = SubmitButton;
