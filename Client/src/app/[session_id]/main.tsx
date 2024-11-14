"use client"

import { useEffect, useRef, useState } from "react";
import Notification from "../components/notification/notification";
import React from "react";
import axiosInstance from "../utils/axiosInstance";
import SideBar from "./sideBar";
import Chat from "./chats";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

const Main = ({ session_id }:{ session_id: any }) => {

  // Extracts the session_id from the URL
  session_id = JSON.parse(session_id.value);

  const [session, setSession] = useState<any>({
    _id: "",
    user: {
      _id: "",
      fullName: "",
      chats: {
        today: [],
        yesterday: [],
        last3Days: [],
        last7Days: [],
        lastWeek: [],
        lessThanAMonth: [],
        lastMonth: [],
        moreThanAMonth: []
      }
    },
    active: false
  });
  const [chatPrompts, setChatPrompts] = useState<any>([]);
  const [inputContent, setInputContent] = useState<string>("");
  const [display, setDisplay] = useState<any>({
    show: false,
    parentStyle: {},
    outputStyle: {}
  });
  const [loading, setLoading] = useState<any>({
    item_id: "",
    load: false
  });
  const [notification, setNotification] = useState<any>({ count: 0 });
  const [chatActive, setChatActive] = useState<any>({ // updated when one selects a chat do display its prompts.
    _id: "",
    style: {}
  });

  // Fetches the session data, user's data and chats data after login using session id.
  const fetchUserData = async({session_id}:{session_id: object}): Promise<any> => {
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
            // Fetch chats.
            const chats = await axiosInstance.get(`/user/chats/${user_data.data?._id}`);
            if(chats){
              const nowHour: number = new Date().getDate();

              setSession({
                _id: session_data.data._id,
                user: {
                  _id: user_data.data?._id,
                  fullName: user_data.data?.fullName,
                  chats: {
                    today: 
                      chats.data.filter((chat: any) => {
                        const createdHour: number = new Date(chat.date).getDate();
                        const period: number = Math.abs(nowHour - createdHour);

                        if(period < 1){ return chat }
                      }),
                    yesterday:
                      chats.data.filter((chat: any) => {
                        const createdHour: number = new Date(chat.date).getDate();
                        const period: number = Math.abs(nowHour - createdHour);

                        if(period === 1){ return chat }
                      }),
                    last3Days:
                      chats.data.filter((chat: any) => {
                        const createdHour: number = new Date(chat.date).getDate();
                        const period: number = Math.abs(nowHour - createdHour);

                        if(period > 1 && period < 4){ return chat }
                      }),
                    last7Days:
                      chats.data.filter((chat: any) => {
                        const createdHour: number = new Date(chat.date).getDate();
                        const period: number = Math.abs(nowHour - createdHour);

                        if(period >= 4 && period <= 7){ return chat }
                      }),
                    lastWeek: 
                      chats.data.filter((chat: any) => {
                        const createdHour: number = new Date(chat.date).getDate();
                        const period: number = Math.abs(nowHour - createdHour);

                        if(period > 7){ return chat }
                      })
                  }
                },
                active: true
              });
            }
          }
        }else{
          setNotification((not: any) => {
            not.count = not.count + 1;
            return{
              ...not,
              display: true,
              type: "error",
              message: "Session Expired",
              description: "Log In to restart the session."
            }
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

  // console.log("Session data", session);
  
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
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(inputContent === ""){
      setNotification((not: any) => {
        not.count = not.count + 1;
        return{
          ...not,
          display: true,
          type: "error",
          message: "No input",
          description: "Please input a value to continue."
        }
      });
    }
    else{
      !display.show && setDisplay({
        show: true,
        parentStyle: { justifyContent: "between" },
        outputStyle: { display: "block" }
      });

      // Update the title has been newly created.
      if(chatPrompts.length === 0){
        try{
          const chat_id = chatActive._id;
          const newChatTitle = inputContent.slice(0, 30).trim();
          await axiosInstance.put("/user/chat", { chat_id, newChatTitle });
        }
        catch(e){
          console.log(e);
        }
      }
  
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
        
        if(chatActive._id === ""){
          try{
            const newChatId = uuidv4();
            const newChatTitle = inputContent.slice(0, 30).trim();
            const res = await axiosInstance.post(`/user/chat`, {_id: newChatId, title: newChatTitle, user_id: session.user._id});

            setSession((sess: any) => {
              return{
                ...sess,
                user: {
                  ...sess.user,
                  chats:{
                    ...sess.user.chats,
                    today: [ ...sess.user.chats.today, res.data ]
                  }
                }
              }
            });

            setChatActive({ _id: newChatId, style: {backgroundColor: "#303030"} });

            const generateResponse = await axiosInstance.get(`/prompt?prompt_id=${newPrompt_id}&chat_id=${newChatId}&promptRequest=${inputContent}`);
            setChatPrompts((p: any) => {
              const updatedP = p.map((e: any) => e._id === newPrompt_id ? { ...e, response: generateResponse.data.response } : e);
              return[...updatedP];
            });
            setLoading({
              ...loading, load: false
            });
            
            handleChatPrompts(res.data._id);
          }
          catch(e){
            console.log(e);
            setLoading({
              ...loading, load: false
            });
          }
        }
        else{
          // Fetches the response.
          const generateResponse = await axiosInstance.get(`/prompt?prompt_id=${newPrompt_id}&chat_id=${chatActive._id}&promptRequest=${inputContent}`);
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
      }
      catch(e) {
        console.log(e);
        setLoading({
          ...loading, load: false
        });
        setNotification((not: any) => {
          not.count = not.count + 1;
          return{
            ...not,
            display: true,
            type: "error",
            message: "Error fetching response",
            description: "Please check your connection in order to continue."
          }
        });
      }
    }
  };

  // console.log("chatPrompts", chatPrompts);

  const handleCreateNewChat = async(): Promise<void> => {
    const chat_id: string = uuidv4();

    const res = await axiosInstance.post(`/user/chat`, {_id: chat_id, title: "New Chat", user_id: session.user._id});
    console.log("res", res);
    !display.show && setDisplay({
      show: true,
      parentStyle: { justifyContent: "between" },
      outputStyle: { display: "block" }
    });

    // Marks the chat as an active chat.
    setChatActive({ _id: chat_id, style: {backgroundColor: "#303030"} });

    // Prompts are empty for a created chat.
    setChatPrompts([]);

    // Add the chat to the session.
    setSession((sess: any) => {
      return{
        ...sess,
        user: {
          ...sess.user,
          chats:{
            ...sess.user.chats,
            today: [ ...sess.user.chats.today, res.data ]
          }
        }
      }
    });
  }

  // Handle retrieval of the chat prompts. Click on chat to retrieve.
  const handleChatPrompts = async(chat_id: string): Promise<void> => {
    try{
      const res = await axiosInstance.get(`/prompts/${chat_id}`);
      if(res){
        setChatPrompts([...res.data]);
        !display.show && setDisplay({
          show: true,
          parentStyle: { justifyContent: "between" },
          outputStyle: { display: "block" }
        });
        setChatActive({ _id: chat_id, style: {backgroundColor: "#303030"} });
      }
    }
    catch(error: any){
      console.log(error);
    }
  }

  // Retrieves the stored state of the active chat.
  useEffect(() => {
    let active: any = window.sessionStorage.getItem("chatActive");
    active = JSON.parse(active);
    // console.log("active", active);

    if(active){
      setChatActive(active);
      // Fetches the prompts for the chat.
      handleChatPrompts(active._id);
    }
  }, []);

  // Stores the state of the active chat.
  useEffect(() => {
    window.sessionStorage.setItem("chatActive", JSON.stringify(chatActive));
  }, [chatActive]);

  // console.log(chatActive);

  // Handles delete of chats
  const handleDeleteChat = () => {
      console.log("yellow");
  }

  const handleLogOut = () => {
    redirect("/");
  }

  return (
     <>
      <Notification
        count={notification.count}
        display={notification.display}
        type={notification.type}
        message={notification.message}
        description={notification.description}
      />
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full 2xl:w-4/5 h-full p-4 relative">
          {/* Side Menu */}
          <SideBar
            session={session}
            handleChatPrompts={handleChatPrompts}
            handleCreateNewChat={handleCreateNewChat}
            handleDeleteChat={handleDeleteChat}
            handleLogOut={handleLogOut}
            chatActive={chatActive}
          />
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