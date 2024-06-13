import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";


const Profile = () => {
    const [userData,setUserData]=useState(null)
    const {user}=useAuth;
    // useEffect(()=>{
    //     fetch(`https://fation-shoes.onrender.com/user/${user?.email}`)
    //         .then((res) => res.json())
    //         .then( (data) =>{
    //      setUserData(data)
    //         });
    // },[user?.email])
    return (
        <div>
            <div className="flex justify-center items-center">
                <figure>
                    <img className="h-[200px] w-[200px] rounded-full border-4 border-black border-dotted" src={user?.photoURL||""} alt="user photo"></img>
                <button  className="mt-5 w-[200px] bg-primary rounded text-white text-lg p-2 font-semibold">
                    <Link to={"edit_profile"}>Update Profile </Link>
                    </button>
                </figure>
            </div>
            <div className="p-8">
                <ul className="grid grid-cols-2 gap-10 text-lg text-white mt-5">
                    <li className="profileDataList">
                     <span>Name:</span>
                    <span>{user?.displayName||(userData?.first_name+userData?.last_name)}</span>
                    </li>
                    <li className="profileDataList">
                     Email:
                    <span>{user?.email||userData?.email}</span>
                    </li>
                    <li className="profileDataList">
                     Mobile:
                    <span>{userData?.mobile_1||""}</span>
                    </li>
                    <li className="profileDataList">
                     Alternative Mobile:
                    <span>{userData?.mobile_2||""}</span>
                    </li>
                    <li className="profileDataList">
                     Address:
                    <span>{userData?.address||""}</span>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default Profile;