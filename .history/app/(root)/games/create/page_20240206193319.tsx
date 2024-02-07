import { auth } from "@clerk/nextjs";
import GameForm from "@/components/shared/GameForm";

const CreateGame = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left text-white">
          Create Game
        </h3>
      </section>

      <div className="wrapper my-8">
        <GameForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateGame;
