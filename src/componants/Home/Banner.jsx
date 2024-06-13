
import bannerImage from '../../assets/banner.jpg'
const Banner = () => {
    return (
        <div className='flex items-center align-middle justify-between'>
            <div className=' mx-2'>
                <h2>PLANIFY</h2>
                <h2>A simple to do list
                to manage it all</h2>
                <p>Easily manage your personal tasks, family projects, and
                team’s work all in one place</p>
                <div className="flex gap-2">
                <button className="btn_outline">
                Let’s Explore
                </button>
                </div>
            </div>
            <div>
                <figure>
                    <img className='mt-0 pt-0' src={bannerImage}/>
                </figure>
            </div>
        </div>
    );
};

export default Banner;