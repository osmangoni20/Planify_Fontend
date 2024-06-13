import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../component/shared/Modal";
import { useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";

const EditTask = () => {
  const { register, handleSubmit } = useForm();
  const shoe = useLoaderData();
  const [isOpen, setModel] = useState(false);
  const [EditData, setEditData] = useState(null);
  const token = localStorage.getItem("token-fation-shoe");
  const notify = (message) => toast(message);
  const isClose = () => {
    setModel(false);
  };
  const isSubmit = async () => {
    // setModel(false);
    // await fetch(`https://fation-shoes.onrender.com/product/${shoe._id}`, {
    //   method: "PATCH",

    //   headers: {
    //     "Content-type": "application/json",
    //     authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(EditData),
    // })
    //   .then((res) => res.json())
    //   .then(async () => {
    //     notify("Update Successfully Done");
    //   });
  };
  const [editInputField, setInputField] = useState({ ...shoe });
  const HandleEditInputField = (e) => {
    e.preventDefault();
    setInputField({ ...editInputField, [e.target.name]: e.target.value });
  };
  const onSubmit = async (data) => {
    console.log(data);
    setModel(true);
    setEditData(data);
  };

  return (
    <div>
      <Modal isOpen={isOpen} isClose={isClose} isSubmit={isSubmit}>
        <Modal.Header>Confirm edit this product Information</Modal.Header>
        <div className="flex justify-center">
          <Modal.Submit>Yes</Modal.Submit>
        </div>
      </Modal>
      <div>
        <h1 className="text-center font-serif font-extralight ">
          Edit Product
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
                    <input type="text" id="task_title"  
                    defaultValue={editInputField?.task_title}
                {...register("task_title", {
                  onChange: (e) => HandleEditInputField(e),
                })} />
                  </div>

                  <div className="w-full my-2">
                    <label className="text-bold " htmlFor="task_deadline">
                      Deadlines
                    </label>
                    <input
                      type="date"
                      id="task_deadline"
                      defaultValue={editInputField?.task_deadline}
                      {...register("task_deadline", {
                        onChange: (e) => HandleEditInputField(e),
                      })}
                    />
                  </div>

                  <div className="w-full my-2">
                    <label className="text-bold " htmlFor="task_priority">
                      Task Priority
                    </label>
                    <select id="task_priority"  defaultValue={editInputField?.task_priority}
                      {...register("task_priority", {
                        onChange: (e) => HandleEditInputField(e),
                      })}
                    
                    >
                      <option value={"low_priority"}>Low</option>
                      <option value={"medium_priority"}> Medium</option>
                      <option value={"high_priority"}>High</option>
                    </select>
                  </div>

                  <div className="w-full my-2">
                    <label className="text-bold block" htmlFor="task_description">
                      Task Description
                    </label>
                    <textarea type="text" id="task_description"  defaultValue={editInputField?.task_description}
                      {...register("task_description", {
                        onChange: (e) => HandleEditInputField(e),
                      })} />
                  </div>
          </div>
          <div className="flex justify-end ">
            <input
              type="submit"
              value={"Update"}
              className="p-3 rounded text-white bg-primary font-bold text-lg"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
