import { auth } from "@clerk/nextjs";
import GameForm from "@/components/shared/GameForm";

const CreateGame = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return <div>CreateGame</div>;
};

export default CreateGame;
