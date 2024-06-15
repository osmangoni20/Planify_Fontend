
// eslint-disable-next-line react/prop-types
import { useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import AddTaskModal from '../Modal/AddTaskModal';
// eslint-disable-next-line react/prop-types
const CreateATask = ({taskList, setTask}) => {
    const [isOpen,setModel]=useState(false)
    const isClose=()=>{
        setModel(false)
    }
    const HandleCreate=(e)=>{
        e.preventDefault();
       setModel(true)
    }
    
    return (
        <div>
            <AddTaskModal isOpen={isOpen} isClose={isClose}/>
            <button onClick={HandleCreate} className="btn_solid">Create Task</button>

        </div>
    );
};

export default CreateATask;