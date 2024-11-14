import { useEffect, useState } from "react";
import DropDown from "./dropDown";

interface Chat {
  _id: string;
  user_id: string,
  title: string;
  date: Date;
  __v: number
}

interface Period {
  periodChats: Chat[];
  period: string;
  chatActive: any;
  handleChatPrompts: (chat_id: string) => any;
  handleDeleteChat: () => void;
}

const History:React.FC<Period> = ({
  periodChats,
  period,
  chatActive,
  handleChatPrompts,
  handleDeleteChat
}) => {

  // Reverses the elements of the array to display the most current item on top of the list.
  const [reversePeriodChats, setReversePeriodChats] = useState<any>([]);
  useEffect(() => {
    setReversePeriodChats([...periodChats.toReversed()])
  }, [periodChats]);

  return (
    <div className="my-6">
      <h3 className="w-full text-sm font-semibold px-2">{period}</h3>
      <div className="w-full">
        { period &&
          reversePeriodChats.map((chat: Chat) => (
            <div
              key={chat._id}
              onClick={() => handleChatPrompts(chat._id)}
              style={ chatActive._id === chat._id ? {...chatActive.style} : {backgroundColor: ""} }
              className="relative w-full h-8 flex justify-between items-center text-sm font-sans hover:bg-lightBlack cursor-pointer px-2 my-1 rounded-md group">
              <div className="w-10/12 overflow-hidden">
                <p className="text-nowrap">{chat.title}</p>
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