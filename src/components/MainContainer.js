import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  return (
    <div className="w-full overflow-x-hidden relative bg-neutral-900">
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
