"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaCheck, FaFacebook, FaGoogle } from "react-icons/fa";
import { RiRobot3Line } from "react-icons/ri";
import { z } from "zod";
import InputFields from "../../components/authComponents/InputFields";
import { useState } from "react";

const schema = z.object({
  fullName: z.string().min(3, {message: "Full Name must be more than 3 characters long!"}).toLowerCase(),
  email: z.string().email({message: "Invalid email address!"}),
  password: z.string().min(8, {message: "Password must be atleast 8 characters long!"}),
});

type Inputs = z.infer<typeof schema>;

const SignUpPage = () => {

  // Handle data input in the form.
  const{
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  // const router = useRouter();
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    // router.push("/");
  });

  // Handles the checkbox on the form.
  const [checkBox, setcheckBox] = useState<boolean>(false);
  const handleCheck = () => {
    setcheckBox((check) => {
      check = !check;
      return check;
    });
  }


  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-[512px] rounded-md border border-gray-200 p-10">
        <div className="flex gap-4 items-center">
          <RiRobot3Line className="w-6 h-6"/>
          <h2 className="font-bold text-xl">MaChatBot</h2>
        </div>
        <h1 className="text-4xl font-semibold my-6">Sign Up</h1>
        {/* Form Details */}
        <form onSubmit={onSubmit}>
          <InputFields
            name="fullName"
            label="Full Name"
            type="text"
            register={register}
            error={errors.fullName}
            placeholder="John Doe"
          />
          <InputFields
            name="email"
            label="Email Address"
            type="email"
            register={register}
            error={errors.email}
            placeholder="Johndoe@gmail.com"
          />
          <InputFields
            name="password"
            label="Password"
            type="password"
            register={register}
            error={errors.password}
          />
          <div className="flex gap-2 my-2 p-2">
            <span onClick={() => handleCheck()} className="flex justify-center items-center w-6 h-6 border border-gray-400 rounded-md cursor-pointer">
              <FaCheck style={ checkBox === false ? { visibility: "hidden" } : { visibility: "visible" }}/>
            </span>
            <p>I want to receive updates through this email.</p>
          </div>
          <button className="w-full h-12 rounded-md bg-slate-50 text-black font-semibold my-4 active:scale-[1.01]">Sign Up</button>
        </form>
        <p className="inline-block text-center w-full">Already have an account?<span><Link href="/auth/login" className="hover:underline ml-1">Log In</Link></span></p>
        <div className="w-full my-4 flex gap-4 items-center justify-center text-gray-500">
          <hr className="w-1/2 border-gray-500"/>
          <p>or</p>
          <hr className="w-1/2 border-gray-500"/>
        </div>
        {/* External Links */}
        <div>
          <Link href="" className="flex items-center justify-center w-full h-12 gap-4 border border-slate-300 my-4 rounded-md">
            <FaGoogle className="w-5 h-5"/>
            <p>Sign up with Google</p>
          </Link>
          <Link href="" className="flex items-center justify-center w-full h-12 gap-4 border border-slate-300 my-4 rounded-md">
            <FaFacebook className="w-5 h-5"/>
            <p>Sign up with Facebook</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage;