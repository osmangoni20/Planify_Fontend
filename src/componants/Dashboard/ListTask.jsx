/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SingleTask from "./SingleTask";

// eslint-disable-next-line react/prop-types
const url="http://localhost:3000/"

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
        <div  className="flex  justify-between">
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
    // eslint-disable-next-line no-unused-vars
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop:(item)=>addItemSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
  
      }))

      const addItemSection=async(id)=>{
        console.log("Drug Item id:",id, status)
        const newStatus=status;
        const UpdateData=task?.find(t=>t?.id===id)
        await fetch(`${url}task/${id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({...UpdateData,status:newStatus})
        }).then(res=>res.json())
        .then(async()=>{
            setTask((prev)=>{

                const mtaskList=prev?.map(t=>{
                    if(t._id===id){
                        return {...t,status:newStatus}
                    }
                    return t;
                })
               
                return mtaskList
            })
            toast.success("Update Task")
        })
      }
    return(
        <div  ref={drop}>
            <Header  text={text} bg={bg} count={taskToMap?.length} />
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

// export const SingleTask=({singleTask,task,setTask})=>{
//     const url="http://localhost:3000/create_task"
//     const [{ isDragging }, drag] = useDrag(() => ({
//         type: "task",
//         item:{id:singleTask?._id},
//         collect: (monitor) => ({
//           isDragging: !!monitor.isDragging()
//         })
  
//       }))
//     const HandleDelete=async(id)=>{
//         await fetch(`${url}/${id}`,{
//             method:"DELETE",
//             headers:{
//                 "Content-type":"application/json"
//             },
//         }).then(res=>res.json())
//         .then(async()=>{
//             const list=task?.filter(t=>t.id!==id)
//             setTask(list)
//             toast.success("Delete Task")
//         })
        
//     }
//     const {_id,task_title,task_deadline,task_description,task_priority}=singleTask
//     return(
//         <div ref={drag} className={`p-5 m-2 bg-gray-200 text-black ${isDragging?"opacity-50":"opacity-100"}`}>
    
//            <div>
//             <div className="card my-5  bg-base-100 shadow-xl text-black">
//                 <div className="card-body">
//                 <h4 className="card-title">{task_title}</h4>
//                 <div className="flex justify-between items-center align-middle">
//                     <p className="text-sm">{task_deadline}</p>
//                     <span className="badge badge-secondary text-sm">{task_priority}</span>
//                     </div>
        
//                 <div>
//                 <p>{task_description}</p>
//                 </div>
//                 <div className="flex gap-1 justify-center items-center">
                
//                 <Link to={`edit/${_id}`}>
//                 <button className="btn_outline text-white">Edit</button>
//                 </Link>
//                 <button onClick={()=>HandleDelete(singleTask._id)} className="btn_solid text-white">Delete</button>
//                 </div>
//                 </div>
//                 </div>
//         </div>
//         </div>
//     )
// }