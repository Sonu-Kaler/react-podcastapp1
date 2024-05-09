import React, { useEffect,useState } from "react";
import Header from "../Components/Common/Header/Header";
import { useDispatch } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../Firebase";
import { setPodcasts } from "../slices/podcastSlice";
import { useSelector } from "react-redux";
import PodcastCard from "../Components/Podcasts/PodcastCard/Podcard";
import Input from "../Components/Common/Input/Input";

const Podcasts = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcast.podcasts);
  const [search,setSearch] = useState("");
  var filteredPodcasts = podcasts.filter((item)=>item.title.trim().toLowerCase().includes(search.trim().toLowerCase()));
  useEffect(() => {
    console.log("Fetching podcasts...");
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        console.log("Fetched podcasts:", podcastsData);
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.log("Error fetching podcasts:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  console.log("Podcasts:", podcasts);

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <Input state={search} setState={setSearch} placeholder="Search By Title" type="text" />
        <h1>Discover Podcasts</h1>
        {filteredPodcasts.length>0?(
            <div className="podcasts-flex">
{filteredPodcasts.map((item)=>{
return (

    <PodcastCard key={item.id} id={item.id} title={item.title} displayImage={item.displayImage}/>
)
})}
</div>
) : (
<p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>
)}
      </div>
    </div>
  );
};

export default Podcasts;
