import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentContainer from "./CommentContainer";
// import RelatedVideos from "./RelatedVideos";
import LiveChat from "./LiveChat";
// import store from "../utils/store";
import { UserCircle } from "lucide-react";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [snippetData, setSnippetData] = useState({});
  const [statisticsData, setStatisticsData] = useState({});
  const [videoId, setVideoId] = useState("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("v");

  const videosList = useSelector((store) => store.video.videos);
 

  const videoDetails = videosList?.filter((video) => {
    const videoId = video.id.videoId ? video.id.videoId : video.id;
    return videoId === id;
  });
  

  useEffect(() => {
    const { snippet, statistics } = videoDetails[0];
    // const { title, channelTitle } = snippet;
    setSnippetData(snippet);
    setStatisticsData(statistics);
  }, [videoDetails, videosList, id]);

  useEffect(() => {
    dispatch(closeMenu());
  }, []);
  useEffect(() => {
    setVideoId(id);
  }, [id]);
  return (
    <>
      {snippetData && (
        <div className="flex flex-col w-screen text-white">
          <div className="lg:flex lg:mx-8 lg:m-2">
            <div className="lg:w-3/4">
              <div className="w-auto ">
                <div className="rounded-lg w-auto ">
                  <iframe
                    className="w-screen aspect-video md:w-full "
                    src={"https://www.youtube.com/embed/" + videoId}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div>
                  <div>
                    <h2 className="text-lg lg:text-2xl py-4  font-semibold ">
                      {snippetData.title}
                    </h2>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex ">
                      <div className="flex items-center justify-center">
                        <UserCircle className="w-10 h-10" />
                      </div>
                      <div className="px-1 lg:px-2">
                        <h2 className="text-1xl font-bold">
                          {snippetData.channelTitle}
                        </h2>
                        <span className="text-sm">3.29M subscribers</span>
                      </div>
                      <div className="mx-4 w-32">
                        <button className="w-full text-sm lg:h-full lg:w-full bg-neutral-700 rounded-full text-white">
                          Subscribe
                        </button>
                      </div>
                    </div>
                    <div className="lg:px-4 lg:flex lg:justify-between">
                      <button className=" lg:w-36 bg-neutral-700 rounded-xl lg:rounded-l-full text-yellow-50 border-r">
                        Likes{" "}
                        <span className="font-light lg:font-medium">
                          {Math.round(
                            parseInt(statisticsData?.likeCount) / 1000
                          )}
                          K
                        </span>
                      </button>
                      <button className=" p-1 lg:w-24 mr-5 bg-neutral-700 rounded-xl lg:rounded-r-full text-yellow-50">
                        Dislikes
                      </button>
                      <button className="p-1 lg:h-full lg:w-20 bg-neutral-700 rounded-full text-white">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-sceen mt-4 lg:w-1/4">
              <div className="w-full lg:w-auto">
                <LiveChat />
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div>{videoId && <CommentContainer videoId={videoId} />}</div>
            {/* <div>
            <RelatedVideos />
          </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default WatchPage;
