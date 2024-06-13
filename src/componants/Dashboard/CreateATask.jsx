
// eslint-disable-next-line react/prop-types
import { useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line react/prop-types
const CreateATask = ({taskList, setTask}) => {
    const[newTask,setNewTask]=useState({
        id:"",
        title:"",
        status:"todo"
    })
    const HandleSubmit=(e)=>{
        e.preventDefault();
        setTask(prev=>{
            const list=[...prev,newTask]
            localStorage.setItem('Tasklist', JSON.stringify(list))
            toast.success("New Task Create Success")
            return list
        })
       console.log(taskList)
       setNewTask({
        id:"",
        title:"",
        status:"todo"
    })
    }
    
    return (
        <div className="flex-col justify-center items-center">
          <form className='flex gap-2' onSubmit={(e)=>HandleSubmit(e)}>
          <input onChange={(e)=>setNewTask({...newTask,id:uuidv4(), title:e.target.value})} type="text"/>
          <input type='submit' value={"Create Task"} className="btn_solid"/>
          </form>
        </div>
    );
};

export default CreateATask;