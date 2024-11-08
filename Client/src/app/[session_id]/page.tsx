import Main from "./main";

const MainPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  return (
    <>
      <Main
        session_id={params}
      />
    </>
  );
}

export default MainPage;