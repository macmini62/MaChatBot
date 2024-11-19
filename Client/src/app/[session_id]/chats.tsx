"use client"

import { RiRobot3Line } from "react-icons/ri";
import Loading from "../components/promptComponents/loading";
import MediaSection from "../components/promptComponents/mediaSection";

const Chat = ({
  user,
  display,
  loading,
  onSubmit,
  inputContent,
  handleChange,
  textareaRef,
  chatPrompts
}:{
  user: any,
  display: any,
  loading: any,
  onSubmit: any,
  inputContent: string,
  handleChange: any,
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  chatPrompts: any
}) => {
  
  return (
      <div style={display.parentStyle} className="w-[calc(100%-348px)] h-[calc(100%-32px)] flex flex-col justify-center items-center border border-white rounded-md absolute right-4">
        {/* Output section */}
        { display.show &&
          <div style={display.outputStyle} className="hidden w-3/4 h-full p-4 my-4 overflow-auto">
            {
              chatPrompts.map((prompt: any) => (
                <div key={prompt._id}>
                  {/* Prompted Query. */}
                  <div className="flex gap-2 items-center justify-center">
                    <span className="w-8 flex items-center justify-center border border-white rounded-full text-white text-lg font-semibold capitalize">{user.fullName.at(0)}</span>
                    <div className=" w-full p-2 bg-lightBlack rounded-md opacity-75 my-2">{prompt.request}</div>
                  </div>
                  <div className="flex gap-2">
                    <RiRobot3Line className="w-8 h-8 my-2 p-1 border border-white rounded-full"/>
                    {/* Response Query */}
                    { loading.load && loading.item_id === prompt._id ? 
                      <Loading/>
                      :
                      <div className="w-full p-2 bg-lightBlack rounded-md opacity-90 my-2 text-wrap">{prompt.response}</div>
                    }
                  </div>
                  <hr className="w-full my-4 opacity-20"/>
                </div>
              ))
            }
          </div>
        }
        {/* Input section */}
        <form onSubmit={onSubmit} className="w-[728px] flex flex-col items-center justify-center my-4 p-2">
          <textarea
            ref={textareaRef}
            value={inputContent}
            onChange={handleChange} // Hide scrollbar and disable manual resizing
            placeholder="Type something here..."
            className="w-full h-14 bg-transparent outline-none border border-white text-white overflow-hidden resize-none rounded-xl px-4 py-3.5"
          />
          {/* Media input section */}
          <MediaSection/>
        </form>
      </div>
  )
};

export default Chat;