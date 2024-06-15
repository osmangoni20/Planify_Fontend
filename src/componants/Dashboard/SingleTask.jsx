    /* eslint-disable react/prop-types */
    import { useDrag } from "react-dnd";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

    // eslint-disable-next-line react/prop-types
    // const SingleTask = ({task}) => {
    //     const{_id,task_title,task_deadline,task_priority, task_description}=task
    //     return (
    //         <div>
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
    //                 <button className="btn_solid text-white">Delete</button>
    //                 </div>
    //                 </div>
    //                 </div>
    //         </div>
    //     );
    // };

    export const SingleTask=({singleTask,task,setTask})=>{
        console.log(singleTask,task)
        const url=`http://localhost:3000/task/${singleTask?._id}`
        const [{ isDragging }, drag] = useDrag(() => ({
            type: "task",
            item:{id:singleTask?._id},
            collect: (monitor) => ({
              isDragging: !!monitor.isDragging()
            })
      
          }))
        const HandleDelete=async(id)=>{
            await fetch(`${url}/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-type":"application/json"
                },
            }).then(res=>res.json())
            .then(async()=>{
                const list=task?.filter(t=>t.id!==id)
                setTask(list)
                toast.success("Delete Task")
            })
            
        }
        const {_id,task_title,task_deadline,task_description,task_priority}=singleTask
        return(
            <div ref={drag} className={`m-2 w-[300px] text-black ${isDragging?"opacity-50":"opacity-100"}`}>
        
               <div>
                <div className="card my-5  shadow-xl text-black">
                    <div className="card-body">
                    <h4 className="card-title">{task_title}</h4>
                    <div className="flex justify-between items-center align-middle">
                        <p className="text-sm">{task_deadline}</p>
                        <span className="badge badge-secondary text-sm">{task_priority}</span>
                        </div>
            
                    <div>
                    <p>{task_description}</p>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                    
                    <Link to={`edit/${_id}`}>
                    <button className="btn_outline text-white">Edit</button>
                    </Link>
                    <button onClick={()=>HandleDelete(singleTask?._id)} className="btn_solid text-white">Delete</button>
                    </div>
                    </div>
                    </div>
            </div>
            </div>
        )
    }
    export default SingleTask;