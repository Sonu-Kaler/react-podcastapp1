import React from "react";
import CreatePodcastForm from "../Components/StartAPodcast/CreatePodcastForm";
import Header from "../Components/Common/Header/Header";
function CreateAPodcast(){
return(
<div>
<Header />
<div className="input-wrapper">
<h1>Create A Podcast</h1>
<CreatePodcastForm />
</div>
</div>
);
}
export default CreateAPodcast;