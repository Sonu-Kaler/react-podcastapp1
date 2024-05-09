import React, { useState } from "react";
import Header from "../Components/Common/Header/Header";
import SignupForm from "../Components/SignupComponent/SignupForm/SignupForm";
import LoginForm from "../Components/SignupComponent/LoginForm/LoginForm";
const SignUpPage=()=>{
    
    const [flag,setFlag] = useState(false);

    
    return(
        <div>
            <Header />
        <div className="input-wrapper">
            {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
            {!flag ? <SignupForm/> : <LoginForm />}
            {!flag ? <p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>Already have an Account? Click here to Login</p> : <p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>Don't have an account? Click here to Signup</p>}

        </div>
        </div>
    )
}
export default SignUpPage;