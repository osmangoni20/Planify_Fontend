import boardImage from '../../assets/board.png'
const Service = () => {
    return (
        <div className='ml-12'>
            <div className='d-block w-[700px]'>
             <h3> A productivity powerhouse</h3>
            <p> Simple, flexible, and powerful. All it takes are boards, lists, and cards
                 to get a clear view of developers, corporate professionals, bankers doing what and what needs to get done.
            </p>
            </div>
           <div className='flex justify-between'>
           <div>
            <ul>
                <li className='serviceCart1'>
                        <h4>Boards</h4>
                        <p>Planify boards keep tasks organized and work moving forward.</p>
                </li>
                <li className='serviceCart2'>
                    <h4>Lists</h4>
            
                    <p>The different stages of a task. Start as simple as To Do, Doing or Done-or build a workflow custom fit to your teams needs</p>
                </li>
                <li className='serviceCart3'>
                    <h4>Cards</h4>
                    <p>Cards represent tasks and ideas and hold all the information to get the job done As you make progress, move cards across lists to show their status</p>
                </li>
            </ul>
            </div>
            <div>
                <figure>
                    <img className=' w-[900px] h-[600px]' src={boardImage}/>
                </figure>
            </div>
           </div>
        </div>
    );
};

export default Service;