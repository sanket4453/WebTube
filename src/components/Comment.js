import React from "react";
import like from "../assets/icons8-like-24.png";
import dislike from "../assets/icons8-dislike-24.png";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const Comment = ({ data }) => {
  // const {name, text, replies} = data;
  const {
    authorChannelUrl,
    authorDisplayName,
    authorProfileImageUrl,
    likeCount,
    textOriginal,
    textDisplay,
  } = data.snippet.topLevelComment.snippet;
  return (
    <div className="flex shadow-sm  p-2 rounded-md">
      <img
        className="w-10 h-10 rounded-full"
        alt="user"
        src={authorProfileImageUrl}
      />
      <div className="px-3">
        <p className="font-bold">@{authorDisplayName}</p>
        <p>{textOriginal ? textOriginal : textDisplay}</p>
        <div className="flex items-center">
          <ThumbsUp className="w-4 h-4 m-[6px]" />
          {likeCount} <ThumbsDown className="w-4 h-4 m-[10px] mt-3" />
        </div>
      </div>
    </div>
  );
};

export default Comment;
