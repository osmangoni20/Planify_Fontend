
import googlelogo from '../../assets/google.svg'
import useAuth from "../../hooks/useAuth";


const Google =  () => {
    const {googleLogin}=useAuth()
    const HandleSignIn= async()=>{
       await googleLogin().then(data=>{
        if(data?.user?.email){
            
            const UserInfo={
                name:data?.user?.displayName,
                email:data?.user?.email,
                img:data?.user?.photoURL
            }
            fetch('https://fation-shoes.onrender.com/add_user',{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(UserInfo),
            }).then(res=>res.json()).then(data=>{
                console.log(data)
            
                localStorage.setItem('token',data?.token)
            })
        }
       })
        
       
    }
    return (
        <div className="w-full ">
            <button onClick={HandleSignIn} className="btn bg-secondary border-primary border-dashed p-2 w-full my-5 text-white text-bold">
                {googlelogo}
                Google
            </button>
        </div>
    );
};
export default Google;