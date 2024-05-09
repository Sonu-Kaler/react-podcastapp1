import React,{useEffect} from "react";
import style from "./style.css";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
// import SignUpPage from "./Pages/Signup";
import SignUpPage from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import {auth,db} from "./Firebase";
import {doc, onSnapshot} from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import PrivateRoutes from "./Components/PrivateRoutes";
import CreateAPodcast from "./Pages/CreataAPodcast";
import Podcasts from "./Pages/Podcasts";

const App=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const unsubscribeAuth=onAuthStateChanged(auth,(user)=>{
        if(user){
        const unsubscribeSnapshot=onSnapshot(
        doc(db,"users",user.uid),
        (userDoc)=>{
        if(userDoc.exists()){
        const userData = userDoc.data();
        dispatch(
        setUser({
        name:userData.name,
        email:userData.email,
        uid:user.uid,
        profilePic:userData.profilePic,
        })
        );
        }
        },
        (error)=>{
        console.error("Error fetching user data:",error);
        }
    );
    return()=>{
        unsubscribeSnapshot();
    };
}
        });
        return()=>{
            unsubscribeAuth();
        };
    },[]);
    return(
        <div>
            <ToastContainer />
            <Router>
<Routes>
<Route path="/" element={<SignUpPage />}/>
<Route element={<PrivateRoutes/>}>
<Route path="/profile" element={<Profile />}/>
<Route path="/create-a-podcast" element={<CreateAPodcast />}/>
<Route path="/podcasts" element={<Podcasts />}/>
</Route>

 {/* <Route element={<PrivateRoutes/>}> 
<Route path="/profile" element={<Profile/>}/>
<Route path="/podcasts" element={<Podcasts/>}/>
<Route path="/create-podcast" element={<CreatePodcast/>}/>
<Route path="/podcast/:podcastId" element={<PodcastDetails/>}/>
<Route path="/podcast/:podcastId/create-episode" element={<CreateEpisode/>}/></Route> */}

</Routes>
</Router>
        </div>
    )
}
export default App;