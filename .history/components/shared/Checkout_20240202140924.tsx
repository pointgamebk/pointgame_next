import { IGame } from "@/lib/database/models/game.model";
import { useEffect } from "react";
import { Button } from "../ui/button";

const Join = ({ game, userId }: { game: IGame; userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Game joined! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Join canceled -- continue to browse and join when you are ready."
      );
    }
  }, []);

  const onJoin = async () => {
    const join = {
      gameTitle: game.title,
      gameId: game._id,
      playerId: userId,
    };

    await checkoutOrder(order);
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
