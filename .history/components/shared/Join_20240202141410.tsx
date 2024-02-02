import { IGame } from "@/lib/database/models/game.model";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { createJoin } from "@/lib/actions/join.actions";

const Join = ({ game, userId }: { game: IGame; userId: string }) => {
  const onJoin = async () => {
    const join = {
      gameTitle: game.title,
      gameId: game._id,
      playerId: userId,
    };

    await createJoin(join);
  };

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  );
};

export default Join;
