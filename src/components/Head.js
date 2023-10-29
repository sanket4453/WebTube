import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import {
  GOOGLE_API_KEY,
  YOUTUBE_SEARCH_API,
  YOUTUBE_SUGGESTION_SEARCH,
} from "../utils/constant";
import { cacheResults } from "../utils/searchSlice";
import { addVideos } from "../utils/videoSlice";
import YouTube_Logo from "../assets/favicon_144x144.png";
import { ArrowLeft, Bell, Menu, Search, Upload, User } from "lucide-react";
import { Link } from "react-router-dom";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const dispatch = useDispatch();
  const cache = useSelector((store) => store.search);

  useEffect(() => {
    // API Call

    //make an api call after evry key press
    //but if the differance between 2 API call is < 200ms
    // Decline the API call
    const timer = setTimeout(() => {
      if (cache[searchQuery]) {
        setSuggestions(cache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const response = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const data = await response.json();
    setSuggestions(data[1]);

    dispatch(
      cacheResults({
        [searchQuery]: data[1],
      })
    );
  };

  const handleToggleMeu = () => {
    dispatch(toggleMenu());
  };

  const handleSearchSuggestion = async () => {
    const response = await fetch(
      `${YOUTUBE_SUGGESTION_SEARCH}&q=${searchQuery}&key=${GOOGLE_API_KEY}&maxResults=50`
    );
    const data = await response.json();
    dispatch(addVideos(data.items));

    setSearchQuery("");
  };

  const handleSearch = async (s) => {
    //write code for get data for search results

    const response = await fetch(
      `${YOUTUBE_SUGGESTION_SEARCH}&q=${s}&key=${GOOGLE_API_KEY}&maxResults=50`
    );
    const data = await response.json();
    dispatch(addVideos(data.items));

    setSearchQuery("");
  };

  const renderedData = suggestions.map((s) => {
    return (
      <li
        onClick={() => handleSearch(s)}
        key={s}
        className="py-1 shadow-sm hover:bg-neutral-700 rounded-lg cursor-pointer z-10 text-white"
      >
        <span className="flex items-center">
          {" "}
          <Search className="mx-1 w-4 h-4" /> {s}
        </span>
      </li>
    );
  });

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <div
        className={`gap-4 items-center flex-shrink-0 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <button
          onClick={() => handleToggleMeu()}
          className="h-8 cursor-pointer text-white"
        >
          <Menu />
        </button>
        {/* <Link to="/"> */}
        <a  href="/" className="flex w-auto items-center" >
        <img
          className="h-8 w-8 mx-1  text-white"
          alt="yutube-logo"
          src={YouTube_Logo}
        />

        <p className="text-white h-full items-center text-xl font-sans font-bold">
          YouTube
        </p>
        </a>
    
        
        {/* </Link> */}
      </div>
      <div
        className={`md:flex gap-4 flex-grow justify-center relative ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {showFullWidthSearch && (
          <button
            className="flex-shrink-0 text-white "
            onClick={() => setShowFullWidthSearch(false)}
          >
            <ArrowLeft />
          </button>
        )}
        <div className="flex flex-grow max-w-[600px] bg-neutral-900">
          <input
            className="rounded-l-full border bg-neutral-900 border-secondary-border text-white shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            // onBlur={() => setShowSuggestion(false)}
            type="text"
            placeholder="Search"
          />
          <button
            className="border border-secondary-border border-1-0 flex-shrink-0 py-2 rounded-r-full px-4 bg-neutral-700"
            onClick={() => handleSearchSuggestion()}
          >
            <Search className="text-white" />
          </button>
        </div>

        {showSuggestion && suggestions.length > 1 && (
          <div className="absolute z-50 bg-neutral-900 py-2 px-4 mt-12 rounded-md w-[18rem] lg:w-[37rem] ">
            <ul className="p-1">{renderedData}</ul>
          </div>
        )}
      </div>
      <div
        className={`flex-shrink-0 md:gap-2 lg:gap-8 text-white ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <button
          onClick={() => setShowFullWidthSearch(true)}
          className="md:hidden"
        >
          <Search />
        </button>
        <button className="md: mx-2">
          <Upload />
        </button>
        <button className="md: mx-2">
          <Bell />
        </button>
        <button className="md: mx-2">
          <User />
        </button>
        {/* <img
          className="h-8"
          alt="user"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47vatk0a8NqyihhmoXPoKhyKI8iPdxkHHL0Tqjd4&s"
        /> */}
      </div>
    </div>
  );
};

export default Head;
