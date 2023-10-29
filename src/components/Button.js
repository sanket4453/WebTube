import React, { useState } from 'react'
import { YOUTUBE_SUGGESTION_SEARCH,GOOGLE_API_KEY } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addVideos } from "../utils/videoSlice";

const Button = ({text}) => {

  // const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();


  const handleClick = async (text) => {
    //write code for get data for search results
   
    const response = await fetch(
      `${YOUTUBE_SUGGESTION_SEARCH}&q=${text}&key=${GOOGLE_API_KEY}&maxResults=50`
    );
    const data = await response.json();
    dispatch(addVideos(data.items));
   
    // setSearchText("");
  };

  return (
    <button className='m-2 rounded-lg text-center text-sm w-auto px-3 py-2 text-neutral-700 bg-gray-200 hover:bg-neutral-900 hover:text-white '
    onClick={()=>handleClick(text)}
    >{text}</button>
  )
}

export default Button