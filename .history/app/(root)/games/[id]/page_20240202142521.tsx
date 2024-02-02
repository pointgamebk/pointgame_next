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
  return <div>GameDetails</div>;
};

export default GameDetails;
