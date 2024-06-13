import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../component/shared/Modal";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
const EditProfile = () => {

const {register,handleSubmit}=useForm()
const [isOpen,setModel]=useState(false);
const [EditData,setEditData]=useState(null)
const token=localStorage.getItem('token-fation-shoe')
const{user,UpdateProfile,UpdatePassword,UpdateEmail}=useAuth()
const [userData,setUserData,]=useState(null)
const [changePassword,setChangePassword]=useState(null);
useEffect(()=>{
    fetch(`https://fation-shoes.onrender.com/user/${user?.email}`)
        .then((res) => res.json())
        .then( (data) =>{
            console.log(data)
     setUserData(data)
        });
},[])
const notify = (message) => toast(message);


const isClose=()=>{
    setModel(false)
}
const HandleChangePassword=(e)=>{
    e.preventDefault();
    UpdatePassword(changePassword)
}
const isSubmit= async()=>{
    setModel(false)
    
   await UpdateEmail(EditData?.email||user?.email).then(data=>console.log(data))
  await fetch(`https://fation-shoes.onrender.com/user/${user?.email}`, {
        method: "PATCH",
        headers: {
        "Content-type": "application/json",
        authorization:`Bearer ${token}`
        },
        body: JSON.stringify(EditData),
    }).then((res) => res.json())
        .then( async() =>{
           
            await UpdateProfile((EditData?.first_name),user?.photoURL)
           notify("Update Profile Successfully")
    
        }
    
    );
       

}
const [editInputField,setInputField]=useState({...userData});
const HandleEditInputField=(e)=>{
    e.preventDefault();
    setInputField({...editInputField,[e.target.name]:e.target.value})
}
const onSubmit= async(data)=>{
    setModel(true)
    setEditData(data)
}

return (
    <div>
        
<Modal isOpen={isOpen} isClose={isClose} isSubmit={isSubmit}>
        <Modal.Header>
        Confirm Update Your Information 
        </Modal.Header>
        <div className='flex justify-center'>   
            <Modal.Submit>Yes</Modal.Submit>
        </div>
    </Modal>
    <div>
    <h1 className="text-center font-serif font-extralight ">Update Profile</h1>
    
    <div className="p-5 shadow-md m-2">
    <div>
        <figure>
            <img className="h-[120] w-[120px] rounded-full" src={user?.photoURL}/>
        </figure>
        <button className="bg-primary text-white m-2 rounded-lg p-2">Upload Picture</button>
    </div>
   
<form className="min-w-[720px] pt-5 " onSubmit={handleSubmit(onSubmit)}>
    
<div className="grid grid-cols-2 gap-3 ">
<div className="w-full my-2">
    <label className="text-bold block" htmlFor="pd_name">First Name</label>
    <input  type="text" id="first_name" defaultValue={userData?.first_name||''}  {...register('first_name', {
onChange: e => HandleEditInputField(e)
})}/>
</div>
<div className="w-full my-2">
    <label className="text-bold block" htmlFor="last_name">Last Name</label>
    <input  type="text" id="last_name" defaultValue={userData?.last_name||""}  {...register('last_name', {
onChange: e => HandleEditInputField(e)
})}/>
</div>
<div className="w-full my-2">
    <label className="text-bold " htmlFor="email"> Email</label> 
    <input  type="text" id="email" value={userData?.email||user.email} {...register("email",{
onChange: e => HandleEditInputField(e)})}/>
</div>
<div className="w-full my-2">
    <label className="text-bold " htmlFor="mobile_1">Mobile Number</label>
    <input type="text" id="mobile_1" defaultValue={userData?.mobile_1||""} {...register("mobile_1",{
onChange: e => HandleEditInputField(e)})}/>
</div>

<div className="w-full my-2">
    <label className="text-bold " htmlFor="mobile_2">Alternative Mobile Number</label>
    <input type="text" id="mobile_2" defaultValue={userData?.mobile_2||""} {...register("mobile_2",{
onChange: e => HandleEditInputField(e)})}/>
</div>
<div className="w-full my-2 ">
<label className="text-bold " htmlFor="address">Change Password</label>

    <div className="flex gap-1">
    <input placeholder="Change Password" onChange={(e)=>setChangePassword(e.target.value)}  type="password" id="password" defaultValue={editInputField?.password||""} />
    <button onClick={(e)=>HandleChangePassword(e)} className="p-2 text-white font-semibold rounded bg-optional-red">Confirm</button>
    </div>
</div>
<div className="w-full my-2">
    <label className="text-bold " htmlFor="address">Address</label>
    <textarea  type="text" id="address" defaultValue={userData?.address||""} {...register("address",{
onChange: e => HandleEditInputField(e)})}/>
</div>
</div>

<div className="flex justify-center">
    <input type="submit" value={"Update Profile"} className="bg-primary cursor-pointer text-white p-3 rounded-lg"></input>
</div>
</form>
</div>
    </div>
    </div>
);
};
export default EditProfile;