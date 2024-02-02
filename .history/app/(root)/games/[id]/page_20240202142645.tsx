import {
  getGameById,
  getRelatedGamesByCategory,
} from "@/lib/actions/game.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const GameDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const game = await getGameById(id);

  const relatedGames = await getRelatedGamesByCategory({
    categoryId: game.category._id,
    gameId: game._id,
    page: searchParams.page as string,
  });
  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain"></section>
    </>
  );
};

export default GameDetails;
