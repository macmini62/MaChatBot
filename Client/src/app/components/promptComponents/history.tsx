import { useEffect, useState } from "react";
import DropDown from "./dropDown";

const History:React.FC<{
  sessionPeriod: any,
  chatActiveStyle: any,
  handleChatPrompts: (chat_id: any) => void,
  handleDeleteChat: () => void
}> = ({
  sessionPeriod,
  chatActiveStyle,
  handleChatPrompts,
  handleDeleteChat
}) => {

  const [duration, setDuration] = useState<any>([]);
  useEffect(() => {
    sessionPeriod._id !== "" && setDuration([...sessionPeriod]);
  }, [sessionPeriod])

  console.log("du",duration)

  return (
    <div className="my-6">
      <h3 className="w-full text-sm font-semibold px-2">Today</h3>
      <div className="w-full">
        { duration &&
          duration.map((chat: any) => (
            <div
              key={chat._id}
              onClick={() => handleChatPrompts(chat._id)}
              style={ chatActiveStyle._id === chat._id ? {...chatActiveStyle.style} : {backgroundColor: ""} }
              className="relative w-full h-8 flex justify-between items-center text-sm font-sans hover:bg-lightBlack cursor-pointer px-2 my-1 rounded-md group">
              <div className="w-10/12 overflow-hidden">
                <p className="text-nowrap">{chat._id}</p>
              </div>
              <DropDown
                handleDeleteChat={() => handleDeleteChat()}
              />
            </div>
          ))
        } 
      </div>
    </div>
  )
}

export default History;