import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API, GOOGLE_API_KEY } from "../utils/constant";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addVideos } from "../utils/videoSlice";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const allVideo = useSelector((store) => store.video.videos)
  const dispatch = useDispatch();
  useEffect(() => {
    getYoutubeVideos();
  }, []);

  const getYoutubeVideos = async () => {
    const response = await fetch(YOUTUBE_VIDEOS_API);
    const data = await response.json();
   
    setVideos(data.items);
    dispatch(addVideos(data.items));
    
  };

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {allVideo && allVideo.map((video) => {
        const videoId = video.id.videoId ? video.id.videoId: video.id;
        return(
        <Link key={videoId} to={"/watch?v="+videoId } > <VideoCard  info={video} /></Link>
      )})}
      
    </div>
  );
};

export default VideoContainer;
