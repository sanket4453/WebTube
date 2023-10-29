import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";

const LiveChat = () => {
  const dispatch = useDispatch();
  const [liveMessage, setLiveMessage] = useState("");
  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      // console.log("API Polling");
      // console.log("API calling using fetch");

      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(20),
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);

  return (
    <>
      <div className="w-full h-[565px] ml-2 p-2 border-black  rounded-lg overflow-y-scroll flex flex-col-reverse bg-neutral-900">
        {chatMessages.map((c, index) => (
          <ChatMessage key={index} name={c.name} message={c.message} />
        ))}
      </div>
      <form className="w-full p-2 ml-2" onSubmit={(e)=>{
        e.preventDefault()
        dispatch(addMessage({
          name:"You",
          message:liveMessage
        }))
        setLiveMessage("")
      }}>
        <input
          className="w-9/12 border border-white bg-neutral-900 rounded-lg text-white"
          type="text"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <button className="px-2 mx-2 w-[65px] border-none bg-gray-500 rounded-sm">Send</button>
      </form>
    </>
  );
};

export default LiveChat;
