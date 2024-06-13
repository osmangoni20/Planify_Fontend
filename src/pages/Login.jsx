
import { useForm, } from "react-hook-form"
import Google from "../componants/LoginAndRegProvider/Google";
import Facebook from "../componants/LoginAndRegProvider/Facebook";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const {user,signIn}=useAuth();
  const location=useLocation();
  const navigate=useNavigate();
  const from=location?.state?.from?.pathname || "/";
  useEffect(() => {
  
    if(user){
      navigate(from,{replace:true})
    }

  }, [from, navigate, user])
    const{handleSubmit, register}=useForm()

    const onSubmit=async(data)=>{
        console.log(data)
       
    const email = data?.email;
    const password = data?.password;
    // if(passwordReset){
    //   resetPassword(email).then( async()=>{
    //    await notify("Send Email for Update Password")
    //     setResetPassword(false)
    //   })
    // }
    {
      await signIn(email, password).then(data=>{
        if(! localStorage.getItem('token-fation-shoe')){
            
            const UserInfo={
                name:data?.user?.displayName,
                email:data?.user?.email,
                img:data?.user?.photoURL
            }
            console.log(UserInfo)
            fetch('https://fation-shoes.onrender.com/add_user',{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(UserInfo),
            }).then(res=>res.json()).then(data=>{
                console.log(data)
                localStorage.setItem('token-fation-shoe',data?.token)
            })
        }
       });
    }

    }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div>
              <h1>Login</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email")}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password")}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn_solid">Login</button>
              </div>

            </form>
            <div>
                <Google/>
                <Facebook/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
