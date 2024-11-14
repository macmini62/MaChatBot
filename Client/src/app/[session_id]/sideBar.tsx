import { BiLogOut } from "react-icons/bi";
import { MdOutlineEditNote } from "react-icons/md";
import { RiRobot3Line } from "react-icons/ri";
import History from "../components/promptComponents/history";

const SideBar:React.FC<{
  session: any,
  handleChatPrompts: (chat_id: any) => any,
  handleDeleteChat: () => void,
  handleLogOut: () => void,
  chatActive: any
}> = ({
  session,
  handleChatPrompts,
  handleDeleteChat,
  handleLogOut,
  chatActive,
}) => {

  return (
    <div className="w-[300px] h-[calc(100%-32px)] absolute flex flex-col justify-between left-4 top-4 border border-slate-300 rounded-md">
      <div className="w-full flex flex-col items-center">
        <div className="flex gap-4 items-center my-4">
          <RiRobot3Line className="w-8 h-8"/>
          <h2 className="font-bold text-2xl">MaChatBot</h2>
        </div>
        <button className="w-4/5 h-10 my-4 flex gap-4 items-center justify-center bg-lightBlack cursor-pointer active:animate-ping rounded-md">
          <MdOutlineEditNote className="w-6 h-6"/>
          <p>New chat</p>
        </button>
        {/* Sessions history */}
        <div className="w-full px-4 my-4">
          {/* History */}
          { session.user.chats.today.length > 0 &&
            <History
              periodChats={session.user.chats.today}
              period={"Today"}
              chatActive={chatActive}
              handleChatPrompts={handleChatPrompts}
              handleDeleteChat={handleDeleteChat}
            />
          }
          { session.user.chats.yesterday.length > 0 &&
            <History
              periodChats={session.user.chats.yesterday}
              period={"Yesterday"}
              chatActive={chatActive}
              handleChatPrompts={handleChatPrompts}
              handleDeleteChat={handleDeleteChat}
            />
          }
          { session.user.chats.last3Days.length > 0 &&
            <History
              periodChats={session.user.chats.last3Days}
              period={"Last 3 Days"}
              chatActive={chatActive}
              handleChatPrompts={handleChatPrompts}
              handleDeleteChat={handleDeleteChat}
            />
          }
          { session.user.chats.last7Days.length > 0 &&
            <History
              periodChats={session.user.chats.last7Days}
              period={"Last 7 Days"}
              chatActive={chatActive}
              handleChatPrompts={handleChatPrompts}
              handleDeleteChat={handleDeleteChat}
            />
          }
        </div>
      </div>
      {/* User Profile */}
      <div className="w-full flex items-center gap-4 p-4 my-4">
        <div className="w-full flex items-center gap-4">
          <span className="w-12 p-1 flex items-center justify-center border border-white rounded-full text-white text-3xl font-semibold capitalize">
            {session.user.fullName.at(0)}
          </span>
          <p className="capitalize">{session.user.fullName}</p>
        </div>
        <BiLogOut onClick={() => handleLogOut()} className="w-8 h-8 cursor-pointer"/>
      </div>
    </div>
  )
}

export default SideBar;