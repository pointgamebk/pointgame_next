import { auth, SignedIn } from "@clerk/nextjs";
import CommentForm from "@/components/shared/CommentForm";
import Comments from "@/components/shared/Comments";
import {
  getGameById,
  getRelatedGamesByCategory,
} from "@/lib/actions/game.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Map from "@/components/shared/Map";
import { JoinConfirmation } from "@/components/shared/JoinConfirmation";
import { UnjoinConfirmation } from "@/components/shared/UnjoinConfirmation";
import GameLocaleConverter from "@/components/shared/GameLocaleConverter";

const GameDetails = async ({ params: { id } }: SearchParamProps) => {
  const game = await getGameById(id);

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const organizerId = game.organizer._id;

  const isOrganizer = userId === organizerId;

  const joins = game.joins;
  const join = joins.find((join: any) => join === userId);

  const comments = game.comments;

  const truncateCountry = (str: string) => {
    const lastCommaIndex = str.lastIndexOf(",");
    if (lastCommaIndex !== -1) {
      return str.substring(0, lastCommaIndex);
    }
    return str;
  };

  // const relatedGames = await getRelatedGamesByCategory({
  //   categoryId: game.category._id,
  //   gameId: game._id,
  //   page: searchParams.page as string,
  // });

  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-white">{game.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-medium-16 rounded-full bg-white/30 px-4 py-2.5 text-white">
                  {game.category.name}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0 text-green">
                <span className="text-green">
                  {game.organizer.firstName} {game.organizer.lastName}
                </span>
              </p>
            </div>
          </div>

          <Map address={game.location} />

          <SignedIn>
            {!isOrganizer && (
              <div>
                {join ? (
                  <UnjoinConfirmation
                    gameId={id}
                    userId={userId}
                    path={`/games/${id}`}
                  />
                ) : (
                  <JoinConfirmation
                    gameId={id}
                    userId={userId}
                    path={`/games/${id}`}
                  />
                )}
              </div>
            )}
          </SignedIn>

          {/* {!isOrganizer && (
            <div>
              {join ? (
                <UnjoinConfirmation
                  gameId={id}
                  userId={userId}
                  path={`/games/${id}`}
                />
              ) : (
                <JoinConfirmation
                  gameId={id}
                  userId={userId}
                  path={`/games/${id}`}
                />
              )}
            </div>
          )} */}

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={32}
                height={32}
              />
              <div className="p-medium-16 lg:p-regular-20 flex-wrap items-center">
                <GameLocaleConverter game={game} />
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <Image
                src="/assets/icons/location.svg"
                alt="location"
                width={32}
                height={32}
              />
              <p className="p-medium-16 lg:p-regular-20 text-white">
                {truncateCountry(game.location)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-white">Game Details:</p>
            <p className="p-medium-16 lg:p-regular-18 text-white">
              {game.description}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <CommentForm gameId={id} userId={userId} />
          </div>

          <div className="flex flex-col gap-2">
            <Comments
              data={comments}
              gameId={id}
              emptyTitle="No comments yet"
              emptyStateSubtext="Check again later"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default GameDetails;
