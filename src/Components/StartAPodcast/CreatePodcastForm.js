import React,{useState} from "react";
import Button from "../Common/Button/Button";
import Input from "../Common/Input/Input";
import FileInput from "../Common/Input/FileInput";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ref } from "firebase/storage";
import { uploadBytes } from "firebase/storage";
import {auth,storage,db} from "../../Firebase";
import { getDownloadURL } from "firebase/storage";
import { addDoc,collection} from "firebase/firestore";
function CreatePodcastForm(){
const [title,setTitle] = useState("");
const [desc,setDesc] = useState("");
const [displayImage, setDisplayImage] = useState();
const [bannerImage, setBannerImage] = useState();


const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const dispatch = useDispatch();

const handleSubmit=async()=>{
toast.success("Handling Form");

if(title && desc && displayImage && bannerImage){
  setLoading(true);
    try{
        const bannerImageRef=ref(
            storage,
            `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);
 

    const displayImageRef=ref(
        storage,
        `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
    await uploadBytes(displayImageRef, displayImage);
    const displayImageUrl = await getDownloadURL(displayImageRef);

    const podcastData={
        title: title,
        description: desc,
        bannerImage: bannerImageUrl,
        displayImage: displayImageUrl,
        createdBy: auth.currentUser.uid,
        };
        
        const docRef= await addDoc(collection(db,"podcasts"),podcastData);
        // this toast is not coming why is that ?
        toast.success("Podcast Created!");
        setLoading(false);
    }
    catch(e){
        toast.error(e.message);
// console.log(e);
setLoading(false);
    }
}
else{
toast.error("Please fill all details");
setLoading(false);
}
}

const displayImageHandle=(file)=>{
    setDisplayImage(file);
}
const bannerImageHandle=(file)=>{
    setBannerImage(file);
}

return(
<>
<Input state={title} setState={setTitle} placeholder="Title" type="text" required={true} />

<Input state={desc} setState={setDesc} placeholder="Description" type="text" required={true} />
<FileInput accept={"image/*"} id="display-image-input" fileHandleFnc={displayImageHandle} text={"Display Image Upload"}/>
<FileInput accept={"image/*"} id="banner-image-input" fileHandleFnc={bannerImageHandle} text={"Banner Image Upload"}/>
<Button text={loading ? "Loading..." : "Create Podcast"} disabled={loading} onClick={handleSubmit} />

</>
);
}
export default CreatePodcastForm;