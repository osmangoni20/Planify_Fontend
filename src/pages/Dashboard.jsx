import { useEffect, useState } from "react";
import { compleatData, ongoingData, todoData } from "../Data/data";
import SingleTask from "../componants/Dashboard/SingleTask";
import CreateATask from "../componants/Dashboard/CreateATask";
import ListTask from "../componants/Dashboard/ListTask";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
const Dashboard = () => {

    const [task,setTask]=useState([])

    useEffect(()=>{
        fetch("http://localhost:3000/task").then(res=>res.json())
        .then(data=>setTask(data))
    },[])
    console.log(task)
    return (
    
        <div className="">
           <DndProvider backend={HTML5Backend}>
           <CreateATask taskList={task} setTask={setTask}></CreateATask>
           <ListTask task={task} setTask={setTask}></ListTask>
           </DndProvider>
           
            
            
            
            <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
            {/* <div>
                <h3 className="mb-2 text-center border-b-2 border-b-[#EB5D7E]">New Task</h3>
                {
                    todoData.map(data=><SingleTask key={data._id} task={data}></SingleTask>)
                }
            </div>
            <div>
            <h3 className="mb-2 text-center border-b-2 border-b-[#FFAD1A]">Doing</h3>
            {
                    ongoingData.map(data=><SingleTask key={data._id} task={data}></SingleTask>)
                }
            </div>

            <div>
            <h3 className="mb-2 text-center border-b-2 border-b-[#995BFC]">Done</h3>
            {
                    compleatData.map(data=><SingleTask key={data._id} task={data}></SingleTask>)
            }
            </div> */}
        </div>
    );
};

export default Dashboard;