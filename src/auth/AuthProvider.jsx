import { GoogleAuthProvider, signOut, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, updateProfile, updateEmail, updatePassword, } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext(null);

import { FacebookAuthProvider } from "firebase/auth/cordova";
import { app } from "../firebase/firebase.config";
const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true)
    const [authError,setError]=useState({})
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider=new FacebookAuthProvider();
useEffect(() => {
const unsubscribe=onAuthStateChanged(auth, (user) => {
    if (user) {
    setUser(user)
        setLoading(false)
    }else{
        setLoading(true)
    }
   return(()=>{
    return unsubscribe()
   })
});
}, [])
const googleLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
};
const facebookLogin=()=>{
    setLoading(true)
    return signInWithPopup(auth, facebookProvider).catch(error=>{
        console.log(error)
    })
}
const resetPassword=(email)=>{
    return sendPasswordResetEmail(auth, email).catch((error) => {
      const errorCode = error.code;
      setError({errorName:errorCode,error})
      // ..
    });
}
const createUser=(email,password)=>{
    console.log(email,password)
    return createUserWithEmailAndPassword(auth,email,password).catch(
        (error)=>{
            console.log(error)
            if(error?.code==="auth/network-request-failed"){
                setError({errorName:"Your internet connection down",error} )
            }
            else if(error.code==="auth/email-already-in-use"){
                setError({errorName:"User already have a account ",error} )
            }
        }
    );
}
const signIn=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password).catch(
        (error)=>{
            console.log(error)
            if(error?.code==="auth/network-request-failed"){
                setError({errorName:"Your internet connection down",error} )
            }
           else if(error?.code==="auth/invalid-credential"){
            setError({errorName:"Your Email or Password incorrect. Go to SignUp",error})
            }
        }
    );
}
const UpdateProfile=(name,img)=>{
    console.log(name,img)
  return  updateProfile(auth.currentUser, {
        displayName: name, photoURL: img
      })
}
const UpdateEmail=(email)=>{
    console.log(email)
    return updateEmail(auth.currentUser, `${email}`).catch(error=>console.log(error))
}
const UpdatePassword=(newPassword)=>{
    console.log(newPassword)
    return updatePassword(auth.currentUser, newPassword).catch(error=>console.log(error))
}
const logOut=()=>{
    signOut(auth).then(() => {
        setUser()
      })
}
const authInfo = {user,loading, UpdateProfile,UpdateEmail,UpdatePassword, facebookLogin,resetPassword, createUser,signIn,logOut, googleLogin,authError};
return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
);
};

export default AuthProvider;
