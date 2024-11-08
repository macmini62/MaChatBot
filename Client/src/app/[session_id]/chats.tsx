"use client"

import { RiRobot3Line } from "react-icons/ri";
import Loading from "../components/promptComponents/loading";
import MediaSection from "../components/promptComponents/mediaSection";

const Chats = ({
  displayResponse,
  loading,
  onSubmit,
  content,
  handleChange,
  textareaRef,
  prompt
}:{
  displayResponse: any,
  loading: boolean,
  onSubmit: any,
  content: string,
  handleChange: any,
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  prompt: any
}) => {
  return (
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
  )
};

export default Chats;