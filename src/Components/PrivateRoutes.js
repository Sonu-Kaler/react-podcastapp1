import {useAuthState} from "react-firebase-hooks/auth";
import {Outlet, Navigate} from "react-router-dom";
import {auth} from ".././Firebase";

const PrivateRoutes=()=>{
const [user, loading, error] = useAuthState(auth);

if(loading){
return <p>Loading...</p>;
}else if(!user || error){
// back to signup le jaa
return <Navigate to="/" replace/>;
}else{
// warna jo hai humne diya hai waha leja means profile
return <Outlet />;
}
};

export default PrivateRoutes;