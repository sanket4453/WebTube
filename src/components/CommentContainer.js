import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { YOUTUBE_COMMENTS_API,GOOGLE_API_KEY } from "../utils/constant";
import { useDispatch, useSelector } from 'react-redux';
import { addVideoDetails } from '../utils/videoSlice';
import { useSearchParams } from "react-router-dom";


const commentData = [
  {
    name: "Akshay Saini",
    text: "This is dummy comment for the video",
    replies: [
      {
        name: "Akshay Saini",
        text: "This is dummy comment for the video",
        replies: [
          {
            name: "Akshay Saini",
            text: "This is dummy comment for the video",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Akshay Saini",
    text: "This is dummy comment for the video",
    replies: [
      {
        name: "Akshay Saini",
        text: "This is dummy comment for the video",
        replies: [
          {
            name: "Akshay Saini",
            text: "This is dummy comment for the video",
            replies: [
              {
                name: "Akshay Saini",
                text: "This is dummy comment for the video",
                replies: [
                  {
                    name: "Akshay Saini",
                    text: "This is dummy comment for the video",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Akshay Saini",
    text: "This is dummy comment for the video",
    replies: [
      {
        name: "Akshay Saini",
        text: "This is dummy comment for the video",
        replies: [
          {
            name: "Akshay Saini",
            text: "This is dummy comment for the video",
            replies: [
              {
                name: "Akshay Saini",
                text: "This is dummy comment for the video",
                replies: [
                  {
                    name: "Akshay Saini",
                    text: "This is dummy comment for the video",
                    replies : [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Akshay Saini",
    text: "This is dummy comment for the video",
    replies: [],
  },
  {
    name: "Akshay Saini",
    text: "This is dummy comment for the video",
    replies: [],
  },
];




const CommentsList = ({comments}) => {
  return(
    <div>
      {
        comments.map((comment,index) => {
          return (<div>
            <Comment key={index} data={comment} />
            {/* <div className="pl-5 border border-l-black ml-5">
              <CommentsList comments={comment.replies} />
              </div> */}
            </div>
          )
        })
      }
    </div>
  )
}

const CommentContainer = ({videoId}) => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get("v");

  const videosList = useSelector((store) => store.video.videos)
  //  const videoDetails = videosList?.filter((video) => video.id.videoId ? video.id.videoId: video.id === id);
  
  const [comments, setComments] = useState([]);

  useEffect(() => {

    fetchComments();

},[videoId])



const fetchComments = async () => {
  const response = await fetch( `${YOUTUBE_COMMENTS_API}&videoId=${videoId}&key=${GOOGLE_API_KEY}&maxResults=100`)
  const data = await response.json();
  setComments(data.items);
}

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(addVideoDetails(info))
  // },[])

  return (
    <div className="m-5 p-2 w-3/4">
      
      <h1 className="text-2xl font-bold"> Comments: </h1>
      {/* <Comment data={commentData[0]} /> */}
     {comments && comments.length>1 && <CommentsList comments={comments} />}
    </div>
  );
};

export default CommentContainer;
