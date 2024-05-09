import React from "react";
import { UseSelector, useSelector } from "react-redux";
import Header from "../Components/Common/Header/Header";
import Button from "../Components/Common/Button/Button";
import { signOut } from "firebase/auth";
import {auth} from "../Firebase";
import {toast} from "react-toastify";
function Profile(){
    const user = useSelector((state)=>state.user.user);
    console.log("My User",user);

    if(!user){
        return <p>Loading...</p>;
    }

    const handleLogout=()=>{
        signOut(auth).then(()=>{
            toast.success("User Logged Out!");
            }).catch((error)=>{
            toast.auth(error.message);
            });
    }
    return(
        <div>
            <Header />
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <h1>{user.uid}</h1>
            <Button text={"Logout"} onClick={handleLogout}/>
        </div>
    )
}
export default Profile;