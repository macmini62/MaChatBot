"use client"

import { useEffect, useRef, useState } from "react";
import { notification } from "antd";
import React from "react";
import axiosInstance from "../utils/axiosInstance";
import SideBar from "./sideBar";
import Chat from "./chats";

const Main = ({ session_id }:{ session_id: any }) => {

  // Extracts the session_id from the URL
  session_id = JSON.parse(session_id.value);
  
  const [userData, setUserData] = useState<any>({
    user_id: "",
    fullName: "",
    session_id: ""
  });
  const [chats, setChats] = useState<any>([]);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<any>({
    promptRequest: "",
    promptResponse: {}
  });
  const [displayResponse, setDisplayResponse] = useState<any>({
      show: false,
      parentStyle: {},
      outputStyle: {}
  });
  const [requesting, setRequesting] = useState<boolean>(false);
  const [prompts, setPrompts] = useState<any>([]);

  // Updates the users' details upon login
  const fetchUserData = async({ session_id }:{ session_id: object }): Promise<any> => {
    const user_data: any = await axiosInstance.get(`/user/session/${session_id}`);
    
    setUserData((data: any)=> {
      return {
        user_id: user_data.data?._id,
        fullName: user_data.data?.fullName,
        session_id: session_id
      }
    });
  };

  useEffect(() => {
    fetchUserData(session_id);
  }, []);

  // Fetches the users' chats
  const fetchChats = async(): Promise<any> => {
    const chats = await axiosInstance.get(`/user/chats/${userData.user_id}`);
    setChats(chats.data);
  };
  useEffect(() => {
    fetchChats();
  }, [userData]);
  
  // Notification
  const [enabled, setEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState(2);
  const [api, contextHolder] = notification.useNotification({
    stack: enabled
      ? {
          threshold,
        }
      : false,
  });
  
  // TextArea resize on input
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "56px"; // Reset height to original to shrink on backspacing
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
    }
    setPrompt((p: any) => {
      return{ promptRequest: content, promptResponse: "" };
    })
  }, [content]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  // handle the submit of input
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content === "") {
      api["error"]({
        placement: "bottomLeft",
        message: "No Input found",
        description: "The input should not be empty. Please type in some prompt to query.",
        duration: 3,
      });
    }
    else {
      // change the display of the page on new prompt input
      setDisplayResponse((display: any) => {
        return {
          ...display,
          show: true,
          parentStyle: { "justifyItems": "between" },
          outputStyle: { "display": "block" }
        }
      });

      setRequesting(true);
      
      const getResponse = async() => {
        try{
          setLoading(load => {
            load = !load;
            return load;
          });

          const response: any = await axiosInstance.get(`/prompt?user_id=${userData.user_id}&chat_id=${chats[0]._id}&promptRequest=${content}`);
          console.log("Response:",response);

          if(response.status === 201){
            const response: any = await axiosInstance.get(`/prompt/${chats[0]._id}`);
            console.log(response);

            return response.data;
          }
        }
        catch(e){
          console.log(e);
          setLoading(load => {
            load = !load;
            return load;
          });
          api["error"]({
            placement: "bottomLeft",
            message: "Please check your network connectivity.",
            description: "",
            duration: 3,
          });
        }
      }

      const incomingPrompts = await getResponse();
      if(incomingPrompts){
        setPrompts([...incomingPrompts]);

        setPrompt((p: any) => {
          return {
            promtRequest: incomingPrompts[0].request,
            promptResponse: incomingPrompts[0].response
          };
        });
      }
      console.log(prompt)
      
      setContent("");
    }
  };

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
          <SideBar
           chats={chats}
           handleDeleteChat={() => handleDeleteChat()}
          />
          {/* Main Section */}
          <Chat
            displayResponse={displayResponse}
            loading={loading}
            onSubmit={onSubmit}
            content={content}
            handleChange={handleChange}
            textareaRef={textareaRef}
            // fetchResponse={requesting}
            prompts={prompts}
          />
        </div>
      </div>
    </>
  )
}

export default Main;