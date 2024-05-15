import { IGame } from "@/lib/database/models/game.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { DeleteGameConfirmation } from "./DeleteGameConfirmation";
import { Separator } from "../ui/separator";
import CardLocaleConverter from "./CardLocaleConverter";

type CardProps = {
  game: IGame;
  hasJoinLink?: boolean;
};

const Card = ({ game }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isGameCreator = userId === game.organizer._id.toString();

  const truncateCountry = (str: string) => {
    const lastCommaIndex = str.lastIndexOf(",");
    if (lastCommaIndex !== -1) {
      return str.substring(0, lastCommaIndex);
    }
    return str;
  };

  return (
    <div className="group relative flex min-h-[200px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[200px]">
      {isGameCreator && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white/90 p-3 shadow-sm transition-all">
          <Link href={`/games/${game._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteGameConfirmation gameId={game._id} userId={userId} />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <Link href={`/games/${game._id}`}>
          <div className="flex gap-2">
            <p className="p-semibold-14  rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {game.category.name}
            </p>
          </div>
        </Link>

        <Link href={`/games/${game._id}`}>
          <CardLocaleConverter game={game} />
          <p className="p-medium-16 p-medium-18 text-grey-500">
            {truncateCountry(game.location)}
          </p>
        </Link>

        <Separator className="border border-black" />

        <Link href={`/games/${game._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {game.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <Link href={`/profile/${game.organizer._id}`}>
            <p className="p-medium-14 md:p-medium-16 text-grey-600">
              {game.organizer.firstName} {game.organizer.lastName.charAt(0)}.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
