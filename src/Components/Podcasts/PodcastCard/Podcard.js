import React from "react";
import PodCardStyle from "./PodCardStyle.css";
import { Link } from "react-router-dom";
function PodcastCard({id,title,displayImage}){
return(
    <Link ti={`/podcast/${id}`}>

    <div className="podcast-card">
        <img className="display-image-podcast" src={displayImage} />
        <p className="title-podcast">{title}</p>
        </div>
    </Link>
)    
}
export default PodcastCard;