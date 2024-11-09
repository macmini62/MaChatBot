import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineEditNote } from "react-icons/md";
import { RiRobot3Line } from "react-icons/ri";
import DropDown from "../components/promptComponents/dropDown";

const SideBar = ({
  chats,
  handleDeleteChat
}:{
  chats: any,
  handleDeleteChat: any
}) => {

  return (
    <div className="w-[300px] h-[calc(100%-32px)] absolute flex flex-col justify-between left-4 top-4 border border-slate-300 rounded-md">
      <div className="w-full flex flex-col items-center">
        <div className="flex gap-4 items-center my-4">
          <RiRobot3Line className="w-8 h-8"/>
          <h2 className="font-bold text-2xl">MaChatBot</h2>
        </div>
        <button className="w-4/5 h-10 my-4 flex gap-4 items-center justify-center bg-lightBlack rounded-md">
          <MdOutlineEditNote className="w-6 h-6"/>
          <p>New chat</p>
        </button>
        {/* Sessions history */}
        <div className="w-full px-4 my-4">
          {/* History */}
          <div className="my-6">
            <h3 className="w-full text-sm font-semibold px-2">Today</h3>
            <div className="w-full">
              {
                chats.map((chat: any, index: number) => (
                  <Link key={index} href="" className="relative w-full h-8 flex justify-between items-center text-sm font-sans hover:bg-lightBlack px-2 my-1 rounded-md group">
                    <div className="w-10/12 overflow-hidden">
                      <p className="text-nowrap">{chat.title}</p>
                    </div>
                    <DropDown
                      handleDeleteChat={handleDeleteChat}
                    />
                  </Link>
                ))
              } 
            </div>
          </div>
          <div className="my-6">
            <h3 className="w-full text-sm font-semibold px-2">Yesterday</h3>
            <div className="w-full">
              <Link href="" className="relative w-full h-8 flex justify-between items-center text-sm font-sans hover:bg-lightBlack px-2 my-1 rounded-md group">
                <div className="w-10/12 overflow-hidden">
                  <p className="text-nowrap">How to set up a router and how to begin the set up.</p>
                </div>
                  <DropDown
                    handleDeleteChat={handleDeleteChat}
                  />
              </Link>
              <Link href="" className="relative w-full h-8 flex justify-between items-center text-sm font-sans hover:bg-lightBlack px-2 my-1 rounded-md group">
                <div className="w-10/12 overflow-hidden">
                  <p className="text-nowrap">Component Based Architecture course.</p>
                </div>
                  <DropDown
                    handleDeleteChat={handleDeleteChat}
                  />
              </Link>
              <Link href="" className="relative w-full h-8 flex justify-between items-center text-sm font-sans hover:bg-lightBlack px-2 my-1 rounded-md group">
                <div className="w-10/12 overflow-hidden">
                  <p className="text-nowrap">Report writing for a final year project.</p>
                </div>
                  <DropDown
                    handleDeleteChat={handleDeleteChat}
                  />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* User Profile */}
      <div className="w-full flex items-center gap-4 p-4 my-4">
        <div className="w-full flex items-center gap-4">
          <span className="w-12 p-1 flex items-center justify-center border border-white rounded-full text-white text-3xl font-semibold capitalize">J</span>
          <p>John Doe</p>
        </div>
        <BiLogOut className="w-8 h-8 cursor-pointer"/>
      </div>
    </div>
  )
}

export default SideBar;