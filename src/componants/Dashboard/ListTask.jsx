/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const ListTask = ({task, setTask}) => {
    console.log(task)
    const [todos,setTodos]=useState([]);
    const [progress,setProgress]=useState([]);
    const [done,setDone]=useState([]);

    useEffect(()=>{
        const todos=task?.filter(t=>t.status==="todo")
        const progress=task?.filter(t=>t.status==="progress")
        const done=task?.filter(t=>t.status==="done")

        setTodos(todos),
        setProgress(progress),
        setDone(done)
    },[task])

    const statusList=["todo","progress",'done']
    return (
        <div className="flex justify-between">
            {
                statusList.map((data,index)=>(
                          <Section 
                status={data}
                 key={index}
                 task={task}
                 setTask={setTask}
                 todos={todos}
                 progress={progress}
                 done={done}
                 ></Section>
                ))
            }
        
        </div>
    );
};

export default ListTask;

export const Section=({status,task,setTask,todos,progress,done})=>{
    let text="Todo"
    let bg="bg-gray-600"
    let taskToMap=todos
    if(status==="progress"){
        text="Progress"
        bg="bg-red-600"
        taskToMap=progress
    }
    if(status==="done"){
        text="Done"
        bg="bg-purple-600"
        taskToMap=done
    }
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop:(item)=>addItemSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
  
      }))

      const addItemSection=(id)=>{
        console.log("Drug Item id:",id, status)
        const newStatus=status;
        setTask((prev)=>{

            const mtaskList=prev?.map(t=>{
                if(t.id===id){
                    return {...t,status:newStatus}
                }
                return t;
            })
           
            return mtaskList
        })
      }
    return(
        <div ref={drop} className="w-64">
            <Header text={text} bg={bg} count={taskToMap?.length} />
            {
                taskToMap?.length>0&&taskToMap.map((data)=><SingleTask key={data.id}
                singleTask={data}
                task={task}
                setTask={setTask}
                ></SingleTask>)
            }
        </div>
    )
}
export const Header=({text, bg, count})=>{

    return(
        <div className={`flex justify-between items-center uppercase px-10 py-2 rounded text-white ${bg}`}>
            {text}
            <div className="bg-white px-2 ml-2 text-sm  rounded-full  text-black">
                {count}
            </div>
        </div>
    )
}

export const SingleTask=({singleTask,task,setTask})=>{
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item:{id:singleTask.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
  
      }))
    const HandleDelete=(id)=>{

        const list=task?.filter(t=>t.id!==id)
        setTask(list)
        toast.success("Delete Task")
    }
    return(
        <div ref={drag} className={`p-5 m-2 bg-gray-200 text-black ${isDragging?"opacity-50":"opacity-100"}`}>
           <h1>{singleTask?.title}</h1>
           <p onClick={()=>HandleDelete(singleTask.id)}>Delete</p>
        </div>
    )
}