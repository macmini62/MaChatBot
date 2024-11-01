import { useState } from "react";
import { FieldError } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

type InputFieldsProps = {
  label:string;
  type:string;
  placeholder?:string;
  register:any;
  name:string;
  defaultValue?:string;
  error?:FieldError;
  inputProps?:React.InputHTMLAttributes<HTMLInputElement>;
}

const InputFields = ({
  label,
  type,
  register,
  name,
  error,
  placeholder,
  inputProps
}:InputFieldsProps) => {

  const [showPass, setShowPass] = useState<boolean>(false);
  const handlePassVisibility = () => {
    setShowPass(show => {
      show = !show;
      return show;
    });
  }
  
  return (
    <div className="">
        { name == "password" ?
          <div className="my-6 relative">
            <label className="my-1">{label}</label>
            <input
              type={showPass ? "text" : "password"}
              {...register(name)}
              placeholder={placeholder}
              {...inputProps}
              className="w-full h-10 bg-transparent text-white py-2 px-4 my-2 outline-none border border-slate-50 rounded-md placeholder:opacity-75"
            />
            { error?.message &&
              <span className="text-red-600 text-xs my-1">
                {error.message.toString()}
              </span>
            }
            <div onClick={() => handlePassVisibility()} className="absolute right-8 bottom-4 cursor-pointer">
              { showPass ?
                <BsEye className="w-6 h-6"/>
                :
                <BsEyeSlash className="w-6 h-6"/>
              }
            </div>
          </div>
          :
          <div className="my-6 relative">
            <label className="my-1">{label}</label>
            <input
              type={type}
              {...register(name)}
              placeholder={placeholder}
              {...inputProps}
              className="w-full h-10 bg-transparent text-white py-2 px-4 my-2 outline-none border border-slate-50 rounded-md placeholder:opacity-75"
            />
            { error?.message &&
              <span className="text-red-600 text-xs my-1">
                {error.message.toString()}
              </span>
            }
          </div>
        }
    </div>
  )
}

export default InputFields;