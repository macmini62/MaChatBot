"use client"

import { BsSendArrowUp } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { RiRobot3Line } from "react-icons/ri";
import { TbMicrophone } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { notification } from "antd";
import React from "react";
import axiosInstance from "../utils/axiosInstance";
import Loading from "../loading";
import SideBar from "./sideBar";
import MediaSection from "../components/promptComponents/mediaSection";

const HomePage = ({ user_id }:{ user_id: any }) => {
  // Extracts the user_id from the URL
  user_id = JSON.parse(user_id.value);
  
  const [content, setContent] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<any>(
    {
      promptRequest: "",
      promptResponse: ""
    }
  );
  const [displayResponse, setDisplayResponse] = useState<any>(
    {
      show: false,
      parentStyle: {},
      outputStyle: {}
    }
  );

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
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "56px"; // Reset height to original to shrink on backspacing
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
    }
  }, [content]);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  // handle the submit on the textarea
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // prevents refresh of the page on button click.
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
          parentStyle: {
            "justifyItems": "between",
          },
          outputStyle: {
            "display": "block"
          }
        }
      });

      setContent("");
      
      setPrompt((p: any) => {
        return { ...p, promptRequest: content };
      });

      let prompt: any = {
        user_id: user_id.user_id,
        promptRequest: content
      }
      let promptContent: any = JSON.stringify(content);
      console.log(typeof(promptContent));
      
      const getResponse = async() => {
        try{
          setLoading(load => {
            load = !load;
            return load;
          });
          const response: any = await axiosInstance.get(`/prompt?user_id=${prompt.user_id}&requestContent=${promptContent}`);
          const res = response.data.response;
          console.log(res);
          return res;
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

      const res = await getResponse();
      if(res){
        setPrompt((p: any) => {
          return { ...p, promptResponse: res };
        });
        setLoading(load => {
          load = !load;
          return load;
        });
      }
    }
  }

  return (
     <>
      {contextHolder}
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full 2xl:w-4/5 h-full p-4 relative">
          {/* Side Menu */}
          <SideBar/>
          {/* Main Section */}
          <div style={displayResponse.parentStyle} className="w-[calc(100%-348px)] h-[calc(100%-32px)] flex flex-col justify-center items-center border border-white rounded-md absolute right-4">
            {/* Output section */}
            { displayResponse.show &&
              <div style={displayResponse.outputStyle} className="hidden w-3/4 h-full p-4 my-4 overflow-auto">
                <div>
                  {/* Prompted Query. */}
                  <div className="flex gap-2 items-center justify-center">
                    <span className="w-8 flex items-center justify-center border border-white rounded-full text-white text-lg font-semibold capitalize">J</span>
                    <div className=" w-full p-2 bg-lightBlack rounded-md opacity-75 my-2">{prompt.promptRequest}</div>
                  </div>
                  <div className="flex gap-2">
                    <RiRobot3Line className="w-8 h-8 my-2 p-1 border border-white rounded-full"/>
                    {/* Response Query */}
                    { loading ? 
                      <Loading/>
                      :
                      <div className="w-full p-2 bg-lightBlack rounded-md opacity-90 my-2 text-wrap">{prompt.promptResponse}</div>
                    }
                  </div>
                  <hr className="w-full my-4 opacity-20"/>
                </div>
              </div>
            }
            {/* Input section */}
            <form onSubmit={onSubmit} className="w-[728px] flex flex-col items-center justify-center my-4 p-2">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={handleChange} // Hide scrollbar and disable manual resizing
                placeholder="Type something here..."
                className="w-full h-14 bg-transparent outline-none border border-white text-white overflow-hidden resize-none rounded-xl px-4 py-3.5"
              />
              {/* Media input section */}
              <MediaSection/>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;