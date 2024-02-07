import GameForm from "@/components/shared/GameForm";
import { getGameById } from "@/lib/actions/game.actions";
import { auth } from "@clerk/nextjs";

type UpdateGameProps = {
  params: {
    id: string;
  };
};

const UpdateGame = async ({ params: { id } }: UpdateGameProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const game = await getGameById(id);

  return (
    <>
      <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left text-white">
          Update Game
        </h3>
      </section>

      <div className="wrapper my-8">
        <GameForm type="Update" game={game} gameId={game._id} userId={userId} />
      </div>
    </>
  );
};

export default UpdateGame;
