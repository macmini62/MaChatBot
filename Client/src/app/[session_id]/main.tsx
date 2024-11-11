"use client"

import { useEffect, useRef, useState } from "react";
import { notification } from "antd";
import React from "react";
import axiosInstance from "../utils/axiosInstance";
import SideBar from "./sideBar";
import Chat from "./chats";
import { v4 as uuidv4 } from "uuid";

const Main = ({ session_id }:{ session_id: any }) => {

  // Extracts the session_id from the URL
  session_id = JSON.parse(session_id.value);
  
  const [session, setSession] = useState<any>({
    _id: "",
    user: {
      _id: "",
      fullName: "",
      chats: []
    },
    active: false
  });
  const [inputContent, setInputContent] = useState<string>("");
  const [chatPrompts, setChatPrompts] = useState<any>([]);
  const [display, setDisplay] = useState<any>({
    show: false,
    parentStyle: {},
    outputStyle: {}
  });
  const [loading, setLoading] = useState<any>({
    item_id: "",
    load: false
  });

  // Fetches the session data, user's data and chats data after login using session id.
  const fetchUserData = async({ session_id }:{ session_id: object }): Promise<any> => {
    try{
      // Fetch session data.
      const session_data: any = await axiosInstance.get(`/session/${session_id}`);
      if(session_data){
        const now: Date = new Date();
        const start: Date = new Date((session_data.data.start_time)*1000);
        const end: Date = new Date((session_data.data.end_time)*1000);
        if(now >= start && now <= end){
          //Fetch user data.
          const user_data: any = await axiosInstance.get(`/user/session/${session_id}`);
          if(user_data){
            // fetch User chats.
            const chats = await axiosInstance.get(`/user/chats/${user_data.data?._id}`);
            if(chats){
              setSession({
                _id: session_data.data._id,
                user: {
                  _id: user_data.data?._id,
                  fullName: user_data.data?.fullName,
                  chats:[...chats.data]
                },
                active: true
              });
            }
          }
        }else{
          api["error"]({
            placement: "bottomLeft",
            message: "Session Expired!",
            description: "Please login again to restart the session.",
            duration: 3,
          });
          throw new Error("Session expired!");
        }
      }
      else{
        setSession((sess: any) => {
          return{
            ...sess,
            active: false
          }
        });
      }
    }
    catch(e){
      console.log(e);
    }
  };
  useEffect(() => {
    fetchUserData(session_id);
  }, []);

  console.log("Session data", session);
  
  // Notification handler.
  const [enabled, setEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState(2);
  const [api, contextHolder] = notification.useNotification({
    stack: enabled
      ? {
          threshold,
        }
      : false,
  });
  
  // TextArea handler.
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "56px"; // Reset height to original to shrink on backspacing
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
    }

  }, [inputContent]);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(event.target.value);
  };

  // handle the submit of input
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDisplay({
      show: true,
      parentStyle: { justifyContent: "between" },
      outputStyle: { display: "block" }
    });

    try {
      setInputContent("");

      const newPrompt_id: string = uuidv4();
      setChatPrompts((p: any) => {
        const new_p: any = {
          _id: newPrompt_id,
          request: inputContent,
          response: ""
        };
  
        return[...p, new_p];
      });
      setLoading({
        item_id: newPrompt_id,
        load: true
      });

      // Fetches the response.
      const generateResponse = await axiosInstance.get(`/prompt?prompt_id=${newPrompt_id}&chat_id=${session.user.chats[0]._id}&promptRequest=${inputContent}`);
      if(generateResponse){
        setChatPrompts((p: any) => {
          const updatedP = p.map((e: any) => e._id === newPrompt_id ? { ...e, response: generateResponse.data.response } : e);
          return[...updatedP];
        });
        setLoading({
          ...loading, load: false
        });
      }
    }
    catch(e) {
      console.log(e);
    }
  };

  console.log("chatPrompts", chatPrompts);

  // Handles delete of chats
  const handleDeleteChat = async(): Promise<any> => {
      console.log("yellow");
  }

  return (
     <>
      {contextHolder}
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full 2xl:w-4/5 h-full p-4 relative">
          {/* Side Menu */}
          { session.user.chats &&
            <SideBar
              userData={session.user}
              handleDeleteChat={() => handleDeleteChat()}
            />
          }
          {/* Main Section */}
          <Chat
            display={display}
            loading={loading}
            onSubmit={onSubmit}
            inputContent={inputContent}
            handleChange={handleChange}
            textareaRef={textareaRef}
            chatPrompts={chatPrompts}
          />
        </div>
      </div>
    </>
  )
}

export default Main;