import React,{useState} from "react";
import Input from "../../Common/Input/Input";
import Button from "../../Common/Button/Button";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,} from "firebase/auth";
import {auth,db,storage} from "../../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UseDispatch, useDispatch } from "react-redux";
import {setUser} from "../../../slices/userSlice"
import { toast } from 'react-toastify';
function LoginForm(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    // const [flag,setFlag] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin=async()=>{
        console.log("Handling Login");
        setLoading(true);
        if(email && password){

            try{
                const userCredential=await signInWithEmailAndPassword(
                auth,
                email,
                password
                );
                const user = userCredential.user;
                
                const userDoc = await getDoc(doc(db, "users", user.uid));
                const userData = userDoc.data();
                console.log("userData", userData);
                dispatch(
                setUser({
                name:userData.name,
                email:user.email,
                uid:user.uid,
                profilePic:userData.profilePic,
                })
                );
                toast.success("User Login Successful!");
                setLoading(false);
                navigate("/profile");
                } catch(error){
                console.log("Error signing in:",error);
                setLoading(false);
                toast.error(error.message);
                }
        }
        else{
            toast.error("Make sure email and password are not empty");
            setLoading(false);
        }
    }
return(
    <>
          
            <Input 
            state={email}
            setState={setEmail}
            placeholder="Email"
            type="text"
            required={true}
            />
            <Input 
            state={password}
            setState={setPassword}
            placeholder="Password"
            type="password"
            required={true}
            />
        
        <Button text={loading?"Loading...":"Login"} disabled={loading} onClick={handleLogin}/>
    </>
)
}
export default LoginForm;