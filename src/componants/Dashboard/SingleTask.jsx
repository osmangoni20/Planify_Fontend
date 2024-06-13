    /* eslint-disable react/prop-types */
    import { Link } from "react-router-dom";


    // eslint-disable-next-line react/prop-types
    const SingleTask = ({task}) => {
        const{_id,task_title,task_deadline,task_priority, task_description}=task
        return (
            <div>
                <div className="card my-5  bg-base-100 shadow-xl text-black">
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
                    <button className="btn_solid text-white">Delete</button>
                    </div>
                    </div>
                    </div>
            </div>
        );
    };

    export default SingleTask;