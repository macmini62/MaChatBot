import HomePage from "./homePage";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  return (
    <>
      <HomePage
        user_id={params}
      />
    </>
  );
}

export default Page;