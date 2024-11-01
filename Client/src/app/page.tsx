"use client"

import Link from "next/link";
import { BsSendArrowUp } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate, MdOutlineEditNote } from "react-icons/md";
import { RiRobot3Line } from "react-icons/ri";
import { TbMicrophone } from "react-icons/tb";
import AutoResizeTextarea from "./components/promptComponents/TextArea";
import { BiLogOut } from "react-icons/bi";
import Loading from "./loading";
import DropDown from "./components/promptComponents/dropDown";

const App = () => {

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full 2xl:w-4/5 h-full p-4 relative">
        {/* Side Menu */}
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
                  <Link href="" className="relative w-full h-8 flex justify-between items-center text-sm font-sans hover:bg-lightBlack px-2 my-1 rounded-md group">
                    <div className="w-10/12 overflow-hidden">
                      <p className="text-nowrap">How to set up a router and how to begin the set up.</p>
                    </div>
                    <DropDown/>
                  </Link>
                  <Link href="" className="relative w-full h-8 flex justify-between items-center text-sm font-sans hover:bg-lightBlack px-2 my-1 rounded-md group">
                    <div className="w-10/12 overflow-hidden">
                      <p className="text-nowrap">Component Based Architecture course.</p>
                    </div>
                    <DropDown/>
                  </Link>
                  <Link href="" className="relative w-full h-8 flex justify-between items-center text-sm font-sans hover:bg-lightBlack px-2 my-1 rounded-md group">
                    <div className="w-10/12 overflow-hidden">
                      <p className="text-nowrap">Report writing for a final year project.</p>
                    </div>
                    <DropDown/>
                  </Link>
                </div>
              </div>
              <div className="my-6">
                <h3 className="w-full text-sm font-semibold px-2">Yesterday</h3>
                <div className="w-full">
                  <Link href="" className="relative w-full h-8 flex justify-between items-center text-sm font-sans hover:bg-lightBlack px-2 my-1 rounded-md group">
                    <div className="w-10/12 overflow-hidden">
                      <p className="text-nowrap">How to set up a router and how to begin the set up.</p>
                    </div>
                    <DropDown/>
                  </Link>
                  <Link href="" className="relative w-full h-8 flex justify-between items-center text-sm font-sans hover:bg-lightBlack px-2 my-1 rounded-md group">
                    <div className="w-10/12 overflow-hidden">
                      <p className="text-nowrap">Component Based Architecture course.</p>
                    </div>
                    <DropDown/>
                  </Link>
                  <Link href="" className="relative w-full h-8 flex justify-between items-center text-sm font-sans hover:bg-lightBlack px-2 my-1 rounded-md group">
                    <div className="w-10/12 overflow-hidden">
                      <p className="text-nowrap">Report writing for a final year project.</p>
                    </div>
                    <DropDown/>
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

        {/* Main Section */}
        <div className="w-[calc(100%-348px)] h-[calc(100%-32px)] flex flex-col justify-between items-center border border-white rounded-md absolute right-4">
          {/* Output section */}
          <div className="w-3/4 h-full p-4 my-4 overflow-auto">
            <div>
              {/* Prompted Query. */}
              <div className="flex gap-2 items-center justify-center">
                <span className="w-8 flex items-center justify-center border border-white rounded-full text-white text-lg font-semibold capitalize">J</span>
                <div className=" w-full p-2 bg-lightBlack rounded-md opacity-75 my-2">
                  Generate for me a recipe for a delicious traditional Gikuyu meal that I can enjoy as my dinner tonight.
                </div>
              </div>
              <div className="flex gap-2">
                <RiRobot3Line className="w-8 h-8 my-2 p-1 border border-white rounded-full"/>
                {/* Response Query */}
                <Loading/>
                {/* <div className="w-full p-2 bg-lightBlack rounded-md opacity-90 my-2 text-wrap">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div> */}
              </div>
              <hr className="w-full my-4 opacity-20"/>
            </div>
          </div>
          {/* Input section */}
          <form className="w-full flex flex-col items-center justify-center my-4">
            <AutoResizeTextarea/>
            <div className="w-1/2 flex justify-between items-center p-2">
              {/* Media input section */}
              <div className="h-10 w-max flex gap-4 justify-center items-center">
                <MdOutlineAddPhotoAlternate className="w-10 h-10 text-white cursor-pointer"/>
                <TbMicrophone className="w-10 h-10 text-white cursor-pointer"/>
              </div>
              <button><BsSendArrowUp className="w-10 h-10 p-1 text-black bg-white border active:border-white active:text-white active:bg-transparent rounded-md cursor-pointer"/></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;