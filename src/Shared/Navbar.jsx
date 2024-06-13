import { Link } from "react-router-dom";

const Navbar = () => {
    const user=false;
    return (
        <div>
            <div className="navbar bg-base-200 fixed top-0">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
      <h1 className="text-4xl">PLANIFY</h1>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
      <li>
        <Link to={"/help"}>Help Center</Link>
      </li>
      <li className="relative">
        <span className="absolute p-10 top-0 right-0 rounded-md bg-red-500 text-white">0</span>
        <Link to={"/notification"}>Notifications</Link>
      </li>
      </ul>
    </div>
    <h1 className="text-4xl">PLANIFY</h1>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-xl">
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
      <li>
        <Link to={"/help"}>Help Center</Link>
      </li>
      <li className="relative">
        <span className="absolute px-2 top-0  py-0 text-center right-0 rounded-full bg-gray-400 text-white">0</span>
        <Link to={"/notification"} className="mr-2">Notifications</Link>
      </li>
    </ul>
  </div>
  <div className="navbar-end">
        {
            user&&<button className="btn_solid">
                <Link to={"/login"}>Login</Link>
            </button>
        }
        {
            !user&&<button>
                <Link to={"/profile"}>
                {
                    user?.photoURL?<figure>
                        <img src=""></img>
                    </figure>:
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  
                }
                </Link>
            </button>
        }
  </div>
</div>
        </div>
    );
};

export default Navbar;