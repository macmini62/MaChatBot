import { redirect } from "next/navigation";

const Page = () => {
  return (
    <>
      {redirect("/auth/signup")}
    </>
  )
}

export default Page;