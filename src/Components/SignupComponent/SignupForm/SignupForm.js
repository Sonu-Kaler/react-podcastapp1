import React,{useState} from "react";
import Input from "../../Common/Input/Input";
import Button from "../../Common/Button/Button";
import {auth,db,storage} from "../../../Firebase";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { dispatch, useDispatch } from "react-redux";
import {setUser} from "../../../slices/userSlice"
import { toast } from 'react-toastify';

function SignupForm(){
    const [fullName,setFullName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [loading,setLoading] = useState(false);
    // const [flag,setFlag] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handleSignup=async()=>{
        console.log("Handling Signup");
        setLoading(true);
        if (password.trim() === confirmPassword.trim() && password.length >= 6 && fullName && email){

            try{
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;
            console.log("user",user);
            await setDoc(doc(db,"users",user.uid),{
                name:fullName,
                email:user.email,
                uid:user.uid,
                // profilePic:fileUrl,
            });
            dispatch(setUser({
                name:fullName,
                email:user.email,
                uid:user.uid,
            })
            );
            toast.success("User has been created!");
            setLoading(false);
            navigate("/profile");
            }catch(e){
            console.log("error",e);
            toast.error(e.message);
            setLoading(false);
            }
            }else{
            // throw an error
            console.log("Passwords do not match or something !");
            if(password!=confirmPassword){
                toast.error(
                    "Please Make Sure Your Password and Confirm Password Matches!"
                )
            }
            else if(password.length<6){
                toast.error(
                    "Length is Less!"
                )
            }
            }
            setLoading(false);
            };
return(
    <>
                    <Input 
            state={fullName}
            setState={setFullName}
            placeholder="Full Name"
            type="text"
            required={true}
            />
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
            <Input 
            state={confirmPassword}
            setState={setConfirmPassword}
            placeholder="Confrim Password"
            type="password"
            required={true}
            />
        <Button text={loading?"Loading...":"Signup"} disabled={loading} onClick={handleSignup}/>
    </>
)
}
export default SignupForm;