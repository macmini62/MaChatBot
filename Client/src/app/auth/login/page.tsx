"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { RiRobot3Line } from "react-icons/ri";
import { z } from "zod";
import InputFields from "../../components/authComponents/InputFields";
import axiosInstance from "@/app/utils/axiosInstance";
import { redirect } from "next/navigation";
import React from "react";
import { notification } from "antd";

const schema = z.object({
  email: z.string().email({message: "Invalid email address!"}),
  password: z.string().min(8, {message: "Password must be atleast 8 characters long!"})
});

type Inputs = z.infer<typeof schema>;

const LogInPage = () => {

  const{
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

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
  
  // Fetch an authorize user
  const onSubmit = handleSubmit(async (data) => {
    const user = await axiosInstance.get(`/user/login?email=${data.email}`);
    if(user){
      const { password, token } = user.data;
      if(password === data.password){
        api["success"]({
          placement: "bottomLeft",
          message: "Logged In successfully.",
          description: "",
          duration: 3,
        });

        // Creates a session for the user
        const session = await axiosInstance.post(`/user/session?auth_token=${token}`);
        console.log(session);
        if(session){
          redirect(`/${session.data._id}`);
        }
      }
      else{
        api["error"]({
          placement: "bottomLeft",
          message: "Please check your password!",
          description: "",
          duration: 3,
        });
      }
    }
  });

  return (
    <>
      {contextHolder}
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-[512px] rounded-md border border-gray-200 p-10">
          <div className="flex gap-4 items-center">
            <RiRobot3Line className="w-6 h-6"/>
            <h2 className="font-bold text-xl">MaChatBot</h2>
          </div>
          <h1 className="text-4xl font-semibold my-6">Log In</h1>
          {/* Form Details */}
          <form onSubmit={onSubmit}>
            <InputFields
              label="Email Address"
              name="email"
              register={register}
              error={errors.email}
              placeholder="johndoe@gmail.com"
              type="email"
            />
            <InputFields
              label="Password"
              name="password"
              register={register}
              error={errors.password}
              type="password"
            />
            <button className="w-full h-12 rounded-md bg-slate-50 text-black font-semibold my-4 hover:scale-[1.01]">Log In</button>
          </form>
          <p className="inline-block text-center w-full">Don't have an account?<span><Link href="/auth/signup" className="hover:underline ml-1">Sign Up</Link></span></p>
          <div className="w-full my-4 flex gap-4 items-center justify-center text-gray-500">
            <hr className="w-1/2 border-gray-500"/>
            <p>or</p>
            <hr className="w-1/2 border-gray-500"/>
          </div>
          {/* External Links */}
          <div>
            <button className="flex items-center justify-center w-full h-12 gap-4 border border-slate-300 my-4 rounded-md">
              <FaGoogle className="w-5 h-5"/>
              <p>Log In with Google</p>
            </button>
            <button className="flex items-center justify-center w-full h-12 gap-4 border border-slate-300 my-4 rounded-md">
              <FaFacebook className="w-5 h-5"/>
              <p>Log In with Facebook</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogInPage;