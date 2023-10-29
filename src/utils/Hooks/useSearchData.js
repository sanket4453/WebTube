import { useDispatch } from "react-redux";
import { GOOGLE_API_KEY, YOUTUBE_SUGGESTION_SEARCH } from "../constant";
import { addVideos } from "../videoSlice";
import { useEffect } from "react";


const useSearchData = (text) =>{
    const dispatch = useDispatch();
    const handleClick = async () => {
        //write code for get data for search results
       
       
        const response = await fetch(
          `${YOUTUBE_SUGGESTION_SEARCH}&q=${text}&key=${GOOGLE_API_KEY}&maxResults=50`
        );
        const data = await response.json();
        dispatch(addVideos(data.items));
       
        // setSearchText("");
      };

      useEffect(() => {
        handleClick(text)
      },[text])
}

export default useSearchData;